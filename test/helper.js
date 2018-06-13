/* global td:true */

global.td = require('testdouble')

module.exports = {
  beforeEach: function() {
  },

  afterEach: function() {
    td.reset()
  },

  beforeAll: function() {
  },

  afterAll: function() {
  }
}
