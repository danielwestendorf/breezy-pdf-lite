const assert  = require('assert')
let htmlPdf, CompletionTrigger

module.exports = {
  beforeEach() {
    htmlPdf           = td.replace('html-pdf-chrome')
    CompletionTrigger = require('../../../lib/pdf/completion-trigger')
  },

  build: {
    callback() {
      new CompletionTrigger({
        callback: 'foo',
        timeout:  1
      }).build()

      td.verify(new htmlPdf.CompletionTrigger.Callback('foo', 1))
    },

    element() {
      new CompletionTrigger({
        element: 'div#foo',
        timeout:  1
      }).build()

      td.verify(new htmlPdf.CompletionTrigger.Element('div#foo', 1))
    },

    event() {
      new CompletionTrigger({
        event:   'foo',
        element: 'body',
        timeout:  1
      }).build()

      td.verify(new htmlPdf.CompletionTrigger.Event('foo', 'body', 1))
    },

    variable() {
      new CompletionTrigger({
        variable: 'foo',
        timeout:  1
      }).build()

      td.verify(new htmlPdf.CompletionTrigger.Variable('foo', 1))
    },

    timer() {
      new CompletionTrigger({
        timer:  1
      }).build()

      td.verify(new htmlPdf.CompletionTrigger.Timer(1))
    },

    defaultTrigger() {
      new CompletionTrigger({}).build()

      td.verify(new htmlPdf.CompletionTrigger.Timer(5000))
    }
  }
}
