const assert    = require('assert')
const fetch     = require('node-fetch')

const port  = server.port,
      token = server.token

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
          let buffer
          try {
            buffer = await this.response.buffer()
          } catch (error) {
            console.log(error)
          }

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
          let text
          try {
            text = await this.response.text()
          } catch (error) {
            console.log(error)
          }

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
          let text
          try {
            text = await this.response.text()
          } catch (error) {
            console.log(error)
          }

          assert(text.match('Encountered an error'))
          done()
        }
      }
    }
  }
}
