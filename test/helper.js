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

  beforeAll: () => {
  },

  afterAll: function() {
  }
}
