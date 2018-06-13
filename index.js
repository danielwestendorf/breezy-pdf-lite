const { spawn } = require('child_process')
const Server    = require('./lib/server')

if (process.env.GOOGLE_CHROME_SHIM !== undefined) {
  console.log('Starting Google Chrome')
  const chrome = spawn(
    process.env.GOOGLE_CHROME_SHIM,
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
      '--no-sandbox'
    ]
  )

  chrome.on('close', async (code) => {
    console.error(`Chrome process closed with code ${code}`);
    process.exit(code);
  });

  chrome.stdout.on('data', (data) => {
    console.log(data.toString())
  })
}

setTimeout(function() {
  new Server({
    port:  process.env.PORT || 5001,
    privateToken: process.env.PRIVATE_TOKEN
  }).start()
}, 4000)

console.log('Starting web server...')
