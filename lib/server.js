const express       = require('express')
const bodyParser    = require('body-parser')
const debug         = require('debug')
const Authorization = require('./authorization')
const Render        = require('./render')

module.exports = class Server {
  constructor(options) {
    this.options = options || {
      port:         5001,
      privateToken: process.env.PRIVATE_TOKEN
    }

    this.app = express()
    this.log = debug(this.options.log || 'breezy-pdf-lite:server')
  }

  start() {
    this.log('Starting server...')

    const authenticatedApp = express()

    // Add middlware
    authenticatedApp.use(Authorization({privateToken: this.options.privateToken}))
    authenticatedApp.post('/html', async (req, res) => {
      res.setTimeout(240000, () => { this.log('Request timedout after 240000ms') })
      this.log('Attempting to render HTML')
      let pdf
      const renderer = new Render(req.body)
      try {
        pdf = await renderer.toPdf()
        res.status(201)
          .set('Content-Disposition', `attachment; filename="${renderer.filename()}"`)
          .send(pdf.toBuffer())
      } catch (error) {
        this.log(error)
        res.status(500).send('Encountered an error while generating PDF. Check the server logs for more details')
      }
    })

    this.app.use(bodyParser.text({
      type:           '*/*',
      limit:          '50mb',
      parameterLimit: 100000,
      extended:       true
    }))

    this.app.get('/', (req, res) => res.send('OK'))
    this.app.use('/render', authenticatedApp)

    this.app.listen(this.options.port, () => {
      console.log(`Listening for requests at http://localhost:${this.options.port}...`)
    })
  }
}
