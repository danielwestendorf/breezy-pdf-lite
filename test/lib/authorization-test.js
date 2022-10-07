const assert = require('assert')

const Authorization = require('../../lib/authorization')

let requestToken = '123456'

module.exports = {
  beforeEach() {
    this.req  = td.object()
    this.res  = td.object()
    this.next = td.func()

    td.when(this.req.get('Authorization')).thenReturn(requestToken)
    td.when(this.res.status(401)).thenReturn(this.res)
  },

  validToken() {
    Authorization({ requestToken: 'foo' })(this.req, this.res, this.next)

    td.verify(this.next())
    td.verify(this.res.send('Invalid Private Token'), { times: 0 })
  },

  invalidToken() {
    Authorization({ privateToken: 'wrong' })(this.req, this.res, this.next)

    td.verify(this.res.send('Invalid Private Token'))
    td.verify(this.next(), { times: 0 })
  },

  noToken() {
    requestToken = null
    Authorization({ privateToken: 'wrong' })(this.req, this.res, this.next)

    td.verify(this.res.send('Invalid Private Token'))
    td.verify(this.next(), { times: 0 })
  },

  blankToken() {
    requestToken = ' '
    Authorization({ privateToken: 'wrong' })(this.req, this.res, this.next)

    td.verify(this.res.send('Invalid Private Token'))
    td.verify(this.next(), { times: 0 })
  }
}
