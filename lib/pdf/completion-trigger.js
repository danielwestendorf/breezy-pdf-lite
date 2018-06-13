const htmlPdf = require('html-pdf-chrome')
const debug   = require('debug')

module.exports = class CompletionTrigger {
  constructor(options) {
    this.options = options || {}

    this.log = debug(options.log || 'breezy-pdf-lite:pdf:completion-triggers')
  }

  build() {
    if (this.options.callback) {
      return this.buildCallbackTrigger()
    } else if (this.options.event) {
      return this.buildEventTrigger()
    } else if (this.options.element) {
      return this.buildElementTrigger()
    } else if (this.options.variable) {
      return this.buildVariableTrigger()
    } else {
      return this.buildTimerTrigger()
    }
  }

  // Private

  buildCallbackTrigger() {
    const callback = this.options.callback || 'breezyPdf'
    const timeout  = parseInt(this.options.timeout) || 5000

    this.log(`Callback trigger specified: callback=${callback} timeout=${timeout}`)
    return new htmlPdf.CompletionTrigger.Callback(callback, timeout)
  }

  buildElementTrigger() {
    const element = this.options.element || 'footer'
    const timeout = parseInt(this.options.timeout) || 5000

    this.log(`Element trigger specified: element=${element} timeout=${timeout}`)
    return new htmlPdf.CompletionTrigger.Element(element, timeout)
  }

  buildEventTrigger() {
    const event   = this.options.event || 'load'
    const element = this.options.element || 'document'
    const timeout = parseInt(this.options.timeout) || 5000

    this.log(`Event trigger specified: event=${event} element=${element} timeout=${timeout}`)
    return new htmlPdf.CompletionTrigger.Event(event, element, timeout)
  }

  buildVariableTrigger() {
    const variable = this.options.variable || 'breezyPDF'
    const timeout  = parseInt(this.options.timeout) || 5000

    this.log(`Variable trigger specified: variable=${variable} timeout=${timeout}`)
    return new htmlPdf.CompletionTrigger.Variable(variable, timeout)
  }

  buildTimerTrigger() {
    const timer = parseInt(this.options.timer) || 5000

    this.log(`Timer trigger specified: timeout=${timer}`)
    return new htmlPdf.CompletionTrigger.Timer(timer)
  }
}
