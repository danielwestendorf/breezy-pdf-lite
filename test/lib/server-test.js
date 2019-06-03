/* global td */
const Server = require('../../lib/server')

module.exports = {
  beforeEach() {
    this.server = new Server()
    this.server.app = td.constructor(this.server.app)
  },

  addsMiddwares() {
    this.server.start()

    td.verify(this.server.app.use(td.matchers.anything()), 2)
  },

  addsApiCreate() {
    this.server.start()

    td.verify(this.server.app.post('/render/html', td.matchers.anything()))
  },

  startsServer() {
    this.server.start()

    td.verify(this.server.app.listen(5001, td.matchers.anything()))
  }
}
