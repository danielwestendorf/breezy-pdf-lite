const htmlPdf           = require('html-pdf-chrome')
const debug             = require('debug')
const uuid              = require('uuid')
const meta              = require('./meta')
const PrintOptions      = require('./pdf/print-options')
const CompletionTrigger = require('./pdf/completion-trigger')

module.exports = class Render {
  constructor(htmlString, options) {
    this.htmlString = htmlString
    this.options  = options || {}

    this.log = debug(this.options.log || 'breezy-pdf-lite:pdf')
  }

  toPdf() {
    const renderOptions = {
      completionTrigger: this.completionTrigger(),
      printOptions:      this.printOptions(),
      host:              'localhost',
      port:              9222
    }

    this.log(`Generating PDF for HTML string with options: ${JSON.stringify(renderOptions)}`)

    return htmlPdf.create(this.htmlString, renderOptions)
  }

  meta() {
    if (this.metadata === undefined) {
      this.metadata = meta(this.htmlString)
    }

    return this.metadata
  }

  filename() {
    return `${(this.meta().filename || uuid()).split('.')[0]}.pdf`
  }

  printOptions() {
    return new PrintOptions(this.meta()).build()
  }

  completionTrigger() {
    return new CompletionTrigger(this.meta()).build()
  }
}
