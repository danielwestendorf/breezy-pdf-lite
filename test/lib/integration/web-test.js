const assert    = require('assert')
const fetch     = require('node-fetch')
const { spawn } = require('child_process')

const port  = 9890,
      token = 'apisecret1234'

let server;
const htmlString = `
  <html>
    <head>
      <meta name='breezy-pdf-width' content='10'/>
    </head>
    <body>
      <meta name='breezy-pdf-timer' content='10'/>
      <h1>Hello!</h1>
    </body>
  </html>
`.trim()

module.exports = {
  async beforeAll(done) {
    const newEnv     = process.env
    newEnv.PORT      = port
    newEnv.PRIVATE_TOKEN = token

    server = spawn('node', ['index.js'], { env: newEnv })
    server.stdout.on('data', (data) => {
      console.log(data.toString())

      if (data.toString().match('Listening')) {
        setTimeout(done, 5000) // Wait for Google Chrome to start
      }
    })
  },

  afterAll() {
    server.kill()
  },

  render: {
    html: {
      successful: {
        async beforeEach(done) {
          try {
            this.response = await fetch(`http://localhost:${port}/render/html`, {
              method:  'POST',
              body:    htmlString,
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          } catch (error) {
            console.log(error)
          }

          done()
        },

        status201() {
          assert.equal(this.response.status, 201)
        },

        async bodyIsBuffer(done) {
          let buffer = await this.response.buffer()

          assert(Buffer, buffer.constructor)
          done()
        }
      },

      invalidToken: {
        async beforeEach(done) {
          try {
            this.response = await fetch(`http://localhost:${port}/render/html`, {
              method:  'POST',
              headers: { 'Authorization': `Bearer 4321` }
            })
          } catch (error) {
            console.log(error)
          }

          done()
        },

        status401() {
          assert.equal(this.response.status, 401)
        },

        async setsErrorMessage(done) {
          let text = await this.response.text()

          assert(text.match('Invalid Private Token'))
          done()
        }
      },

      encounteredAnError: {
        async beforeEach(done) {
          try {
            this.response = await fetch(`http://localhost:${port}/render/html`, {
              method:  'POST',
              headers: { 'Authorization': `Bearer ${token}` },
              body: `
                <html>
                  <head>
                    <meta name="breezy-pdf-callback" content="bob">
                    <meta name="breezy-pdf-timeout" content="10">
                  </head>
                  </html>
                `.trim()

            })
          } catch (error) {
            console.log(error)
          }

          done()
        },

        status500() {
          assert.equal(this.response.status, 500)
        },

        async setsErrorMessage(done) {
          let text = await this.response.text()

          assert(text.match('Encountered an error'))
          done()
        }
      }
    }
  }
}
