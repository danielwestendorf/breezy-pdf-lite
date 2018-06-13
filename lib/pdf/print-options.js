const htmlPdf = require('html-pdf-chrome')
const debug   = require('debug')

module.exports = class PrintOptions {
  constructor(options) {
    this.options = options || {}
    this.log = debug(options.log || 'breezy-pdf-lite:pdf:print-options')
  }

  build() {
    const options = {
      preferCSSPageSize: this.truthy(this.options.cssPageSize) || false,
      paperWidth:        this.floatOrDefault(this.options.width, 8.5),
      paperHeight:       this.floatOrDefault(this.options.height, 11),
      marginTop:         this.floatOrDefault(this.options.marginTop, 0.4),
      marginBottom:      this.floatOrDefault(this.options.marginBottom, 0.4),
      marginLeft:        this.floatOrDefault(this.options.marginLeft, 0.4),
      marginRight:       this.floatOrDefault(this.options.marginRight, 0.4),
      landscape:         this.truthy(this.options.landscape) || false,
      scale:             this.floatOrDefault(this.options.scale, 1),
      printBackground:   this.truthy(this.options.displayBackground) || false,
      pageRanges:        this.options.pageRanges || '',

      headerTemplate:    this.options.headerTemplate,
      footerTemplate:    this.options.footerTemplate,

      ignoreInvalidPageRanges: true,
      displayHeaderFooter:     (this.options.headerTemplate !== undefined || this.options.footerTemplate !== undefined)

    }

    this.log(`Rendering with options: ${options}`)

    return options
  }

  // Private

  truthy(val) {
    switch (typeof val) {
      case "boolean":
        return val;
      case "string":
        return val == 'true';
      case "number":
        return val == 1;
    }
  }

  floatOrDefault(val, defaultVal) {
    if (val !== undefined) {
      return parseFloat(val);
    } else {
      return defaultVal;
    }

  }
}
