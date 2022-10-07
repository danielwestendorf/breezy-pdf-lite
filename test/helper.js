/* global td:true */
/* global server:true */

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

  beforeAll: () => {
  },

  afterAll: function() {
  }
}
