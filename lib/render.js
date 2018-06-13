const htmlPdf           = require('html-pdf-chrome')
const debug             = require('debug')
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
      printOptions:      this.printOptions()
    }

    if (process.env.GOOGLE_CHROME_SHIM !== undefined) {
      renderOptions.host = 'localhost'
      renderOptions.port = 9222
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

  printOptions() {
    return new PrintOptions(this.meta()).build()
  }

  completionTrigger() {
    return new CompletionTrigger(this.meta()).build()
  }
}
