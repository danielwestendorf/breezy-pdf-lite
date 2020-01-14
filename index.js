const { spawn } = require('child_process')
const Server    = require('./lib/server')

console.log('Starting Google Chrome')
const chrome = spawn(
  (process.env.GOOGLE_CHROME_SHIM || '/usr/bin/google-chrome'),
  [
    '--disable-extensions',
    '--disable-background-networking',
    '--safebrowsing-disable-auto-update',
    '--disable-sync',
    '--metrics-recording-only',
    '--disable-default-apps',
    '--no-first-run',
    '--mute-audio',
    '--hide-scrollbars',
    '--no-sandbox',
    '--headless',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-software-rasterizer',
    '--mute-audio',
    '--remote-debugging-port=9222'
  ]
)

chrome.on('close', (code) => {
  console.error(`Chrome process closed with code ${code}`);
  process.exit(code);
});

chrome.stdout.on('data', (data) => {
  console.log(data.toString())
})

new Server({
  port:  process.env.PORT || 5001,
  privateToken: process.env.PRIVATE_TOKEN
}).start()

console.log('Starting web server...')
