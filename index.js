const Server = require('./lib/server')

console.log('Starting web server...')

new Server({
  port:  process.env.PORT || 5001,
  privateToken: process.env.PRIVATE_TOKEN
}).start()
