const ChromeLauncher = require('chrome-launcher')
const Server         = require('./lib/server')

const compressionOptions = {
  level:     process.env.COMPRESSION_LEVEL || -1,
  chunkSize: process.env.COMPRESSION_CHUNK_SIZE || 16384,
  memLevel:  process.env.COMPRESSION_MEM_LEVEL || 8
}

const webServer = new Server({
  port:         process.env.PORT || 5001,
  privateToken: process.env.PRIVATE_TOKEN,
  compression:  compressionOptions
})

console.log('Starting Google Chrome')

ChromeLauncher.launch({
  chromeFlags: ['--headless', '--disable-gpu', '--disable-dev-shm-usage', '--no-sandbox', '--hide-scrollbars'],
  port: 9222,
  startingUrl: (process.env.STARTING_URL || 'about:blank')
}).then((chrome) => {
  console.log(`Chrome debugging port running on ${chrome.port}`)

  chrome.process.on('close', (code) => {
    console.error(`Chrome process closed with code ${code}`)
    process.exit(code);
  })

  webServer.start()
}).catch((error) => {
  console.error(error)
  console.error('Exiting')

  process.exit(1)
})
