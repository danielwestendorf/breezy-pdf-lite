const ChromeLauncher = require('chrome-launcher')
const Server         = require('./lib/server')

const webServer = new Server({
  port:  process.env.PORT || 5001,
  privateToken: process.env.PRIVATE_TOKEN
})

console.log('Starting Google Chrome')

ChromeLauncher.launch({
  chromeFlags: ['--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--hide-scrollbars'],
  chromePath: (process.env.GOOGLE_CHROME_SHIM || '/usr/bin/google-chrome'),
  port: 9222,
  connectionPollInterval: 10
}).then(chrome => {
  console.log(`Chrome debugging port running on ${chrome.port}`);

  webServer.start()
  console.log('Starting web server...')
})
