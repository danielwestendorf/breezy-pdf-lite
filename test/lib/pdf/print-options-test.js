/* global td */
const assert  = require('assert')
let PrintOptions

module.exports = {
  beforeEach() {
    td.replace('html-pdf-chrome')

    PrintOptions = require('../../../lib/pdf/print-options')
  },

  build: {
    preferCSSPageSize: {
      default() {
        assert.deepStrictEqual(false, new PrintOptions({}).build().preferCSSPageSize)
      },

      specified() {
        const options = { cssPageSize: true }

        assert.deepStrictEqual(true, new PrintOptions(options).build().preferCSSPageSize)
      }
    },

    paperWidth: {
      default() {
        assert.deepStrictEqual(8.5, new PrintOptions({}).build().paperWidth)
      },

      specified() {
        const options = { width: 10 }

        assert.deepStrictEqual(10, new PrintOptions(options).build().paperWidth)
      }
    },

    paperHeight: {
      default() {
        assert.deepStrictEqual(11, new PrintOptions({}).build().paperHeight)
      },

      specified() {
        const options = { height: 5 }

        assert.deepStrictEqual(5, new PrintOptions(options).build().paperHeight)
      }
    },

    marginTop: {
      default() {
        assert.deepStrictEqual(0.4, new PrintOptions({}).build().marginTop)
      },

      specified() {
        const options = { marginTop: 1 }

        assert.deepStrictEqual(1, new PrintOptions(options).build().marginTop)
      }
    },

    marginBottom: {
      default() {
        assert.deepStrictEqual(0.4, new PrintOptions({}).build().marginBottom)
      },

      specified() {
        const options = { marginBottom: 1 }

        assert.deepStrictEqual(1, new PrintOptions(options).build().marginBottom)
      }
    },

    marginLeft: {
      default() {
        assert.deepStrictEqual(0.4, new PrintOptions({}).build().marginLeft)
      },

      specified() {
        const options = { marginLeft: 1 }

        assert.deepStrictEqual(1, new PrintOptions(options).build().marginLeft)
      }
    },

    marginRight: {
      default() {
        assert.deepStrictEqual(0.4, new PrintOptions({}).build().marginRight)
      },

      specified() {
        const options = { marginRight: 1 }

        assert.deepStrictEqual(1, new PrintOptions(options).build().marginRight)
      }
    },

    landscape: {
      default() {
        assert.deepStrictEqual(false, new PrintOptions({}).build().landscape)
      },

      specified() {
        const options = { landscape: 1 }

        assert.deepStrictEqual(true, new PrintOptions(options).build().landscape)
      }
    },

    scale: {
      default() {
        assert.deepStrictEqual(1, new PrintOptions({}).build().scale)
      },

      specified() {
        const options = { scale: '2' }

        assert.deepStrictEqual(2, new PrintOptions(options).build().scale)
      }
    },

    printBackground: {
      default() {
        assert.deepStrictEqual(false, new PrintOptions({}).build().printBackground)
      },

      specified() {
        const options = { displayBackground: 'true' }

        assert.deepStrictEqual(true, new PrintOptions(options).build().printBackground)
      }
    },

    headerTemplate: {
      default() {
        assert.deepStrictEqual(null, new PrintOptions({}).build().headerTemplate)
      },

      specified() {
        const options = { headerTemplate: '<div></div>' }

        assert.deepStrictEqual('<div></div>', new PrintOptions(options).build().headerTemplate)
      }
    },

    footerTemplate: {
      default() {
        assert.deepStrictEqual(null, new PrintOptions({}).build().footerTemplate)
      },

      specified() {
        const options = { footerTemplate: '<div></div>' }

        assert.deepStrictEqual('<div></div>', new PrintOptions(options).build().footerTemplate)
      }
    },

    pageRanges: {
      default() {
        assert.deepStrictEqual('', new PrintOptions({}).build().pageRanges)
      },

      specified() {
        const options = { pageRanges: '1-3' }

        assert.deepStrictEqual('1-3', new PrintOptions(options).build().pageRanges)
      }
    }
  }
}
