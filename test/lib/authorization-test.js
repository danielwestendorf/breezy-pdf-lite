/* global td */
const Authorization = require('../../lib/authorization')
const token         = '123456'

module.exports = {
  beforeEach() {
    this.req  = td.object()
    this.res  = td.object()
    this.next = td.func()

    td.when(this.req.get('Authorization')).thenReturn(token)
    td.when(this.res.status(401)).thenReturn(this.res)
  },

  validToken() {
    Authorization({ token: token })(this.req, this.res, this.next)

    td.verify(this.next())
    td.verify(this.res.send('Invalid Private Token'), { times: 0 })
  },

  invalidToken() {
    Authorization({ privateToken: 'wrong' })(this.req, this.res, this.next)

    td.verify(this.res.send('Invalid Private Token'))
    td.verify(this.next(), { times: 0 })
  }
}
