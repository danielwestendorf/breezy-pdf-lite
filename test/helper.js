/* global td:true */
/* global server:true */
const { spawn } = require('child_process')

global.td = require('testdouble')

global.server = {
  port:  9890,
  token: 'apisecret1234'
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

    server.process.stdout.on('data', (data) => {
      console.log(data.toString())

      if (data.toString().match('Listening')) {
        setTimeout(function() {
          done()
        }, 1000)
      }
    })
  },

  afterAll: function() {
    server.process.kill()
  }
}
