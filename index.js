const ChromeLauncher = require('chrome-launcher')
const Server         = require('./lib/server')

const webServer = new Server({
  port:         process.env.PORT || 5001,
  privateToken: process.env.PRIVATE_TOKEN
})

console.log('Starting Google Chrome')

ChromeLauncher.launch({
  chromeFlags: ['--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--hide-scrollbars'],
  port:        9222,
  startingUrl: (process.env.STARTING_URL || 'about:blank')
}).then((chrome) => {
  console.log(`Chrome debugging port running on ${chrome.port}`)

  chrome.process.on('close', (code) => {
    console.error(`Chrome process closed with code ${code}`)
    process.exit(code)
  })

  webServer.start()
}).catch((error) => {
  console.error(error)
  console.error('Exiting')

  process.exit(1)
})
