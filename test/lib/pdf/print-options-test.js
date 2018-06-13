const assert  = require('assert')
let htmlPdf, PrintOptions

module.exports = {
  beforeEach() {
    htmlPdf      = td.replace('html-pdf-chrome')
    PrintOptions = require('../../../lib/pdf/print-options')
  },

  build: {
    preferCSSPageSize: {
      default() {
        assert.deepEqual(false, new PrintOptions({}).build().preferCSSPageSize)
      },

      specified() {
        const options = { cssPageSize: true }

        assert.deepEqual(true, new PrintOptions(options).build().preferCSSPageSize)
      }
    },

    paperWidth: {
      default() {
        assert.deepEqual(8.5, new PrintOptions({}).build().paperWidth)
      },

      specified() {
        const options = { width: 10 }

        assert.deepEqual(10, new PrintOptions(options).build().paperWidth)
      }
    },

    paperHeight: {
      default() {
        assert.deepEqual(11, new PrintOptions({}).build().paperHeight)
      },

      specified() {
        const options = { height: 5 }

        assert.deepEqual(5, new PrintOptions(options).build().paperHeight)
      }
    },

    marginTop: {
      default() {
        assert.deepEqual(0.4, new PrintOptions({}).build().marginTop)
      },

      specified() {
        const options = { marginTop: 1 }

        assert.deepEqual(1, new PrintOptions(options).build().marginTop)
      }
    },

    marginBottom: {
      default() {
        assert.deepEqual(0.4, new PrintOptions({}).build().marginBottom)
      },

      specified() {
        const options = { marginBottom: 1 }

        assert.deepEqual(1, new PrintOptions(options).build().marginBottom)
      }
    },

    marginLeft: {
      default() {
        assert.deepEqual(0.4, new PrintOptions({}).build().marginLeft)
      },

      specified() {
        const options = { marginLeft: 1 }

        assert.deepEqual(1, new PrintOptions(options).build().marginLeft)
      }
    },

    marginRight: {
      default() {
        assert.deepEqual(0.4, new PrintOptions({}).build().marginRight)
      },

      specified() {
        const options = { marginRight: 1 }

        assert.deepEqual(1, new PrintOptions(options).build().marginRight)
      }
    },

    landscape: {
      default() {
        assert.deepEqual(false, new PrintOptions({}).build().landscape)
      },

      specified() {
        const options = { landscape: 'true' }

        assert.deepEqual(true, new PrintOptions(options).build().landscape)
      }
    },

    scale: {
      default() {
        assert.deepEqual(1, new PrintOptions({}).build().scale)
      },

      specified() {
        const options = { scale: '2' }

        assert.deepEqual(2, new PrintOptions(options).build().scale)
      }
    },

    printBackground: {
      default() {
        assert.deepEqual(false, new PrintOptions({}).build().printBackground)
      },

      specified() {
        const options = { displayBackground: 'true' }

        assert.deepEqual(true, new PrintOptions(options).build().printBackground)
      }
    },

    headerTemplate: {
      default() {
        assert.deepEqual(null, new PrintOptions({}).build().headerTemplate)
      },

      specified() {
        const options = { headerTemplate: '<div></div>' }

        assert.deepEqual('<div></div>', new PrintOptions(options).build().headerTemplate)
      }
    },

    footerTemplate: {
      default() {
        assert.deepEqual(null, new PrintOptions({}).build().footerTemplate)
      },

      specified() {
        const options = { footerTemplate: '<div></div>' }

        assert.deepEqual('<div></div>', new PrintOptions(options).build().footerTemplate)
      }
    },

    pageRanges: {
      default() {
        assert.deepEqual('', new PrintOptions({}).build().pageRanges)
      },

      specified() {
        const options = { pageRanges: '1-3' }

        assert.deepEqual('1-3', new PrintOptions(options).build().pageRanges)
      }
    }
  }
}
