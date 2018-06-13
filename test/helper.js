/* global td:true */
/* global server:true */
const { spawn } = require('child_process')

global.td = require('testdouble')

global.server = {
  port:  9890,
  token: 'apisecret1234'
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
  beforeEach: function() {
  },

  afterEach: function() {
    td.reset()
  },

  beforeAll: async function(done) {
    const newEnv     = process.env
    newEnv.PORT      = server.port
    newEnv.PRIVATE_TOKEN = server.token

    server.process = spawn('node', ['index.js'], { env: newEnv })

    server.process.stdout.on('data', async (data) => {
      console.log(data.toString())

      if (data.toString().match('Listening')) {
        await timeout(5000)
        done()
      }
    })
  },

  afterAll: function() {
    server.process.kill()
  }
}
