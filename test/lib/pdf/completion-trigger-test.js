module.exports = {
  beforeEach() {
    this.htmlPdf           = td.replace('html-pdf-chrome')
    this.CompletionTrigger = require('../../../lib/pdf/completion-trigger')
    this.Trigger           = td.constructor()
  },

  build: {
    callback() {
      this.htmlPdf.CompletionTrigger.Callback = this.Trigger

      new this.CompletionTrigger({
        callback: 'foo',
        timeout:  1
      }).build()

      td.verify(new this.Trigger('foo', 1))
    },

    element() {
      this.htmlPdf.CompletionTrigger.Element = this.Trigger

      new this.CompletionTrigger({
        element: 'div#foo',
        timeout: 1
      }).build()

      td.verify(new this.Trigger('div#foo', 1))
    },

    event() {
      this.htmlPdf.CompletionTrigger.Event = this.Trigger

      new this.CompletionTrigger({
        event:   'foo',
        element: 'body',
        timeout: 1
      }).build()

      td.verify(new this.Trigger('foo', 'body', 1))
    },

    variable() {
      this.htmlPdf.CompletionTrigger.Variable = this.Trigger

      new this.CompletionTrigger({
        variable: 'foo',
        timeout:  1
      }).build()

      td.verify(new this.Trigger('foo', 1))
    },

    timer() {
      this.htmlPdf.CompletionTrigger.Timer = this.Trigger

      new this.CompletionTrigger({
        timer: 1
      }).build()

      td.verify(new this.Trigger(1))
    },

    defaultTrigger() {
      this.htmlPdf.CompletionTrigger.Timer = this.Trigger

      new this.CompletionTrigger({}).build()

      td.verify(new this.Trigger(5000))
    }
  }
}
