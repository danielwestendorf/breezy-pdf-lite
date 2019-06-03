/* global td */
const assert = require('assert')
let Render

const htmlString = `
  <html>
    <head>
      <meta name='breezy-pdf-filename' content='fancyfilename'/>
      <meta name='breezy-pdf-width' content='10'/>
    </head>
    <body>
      <meta name='breezy-pdf-callback' content='ready'/>
      <meta name='breezy-pdf-timeout' content='3000'/>
    </body>
  </html>
`.trim()

module.exports = {
  beforeEach() {
    this.htmlPdf = td.replace('html-pdf-chrome')

    Render = require('../../lib/render')
  },

  metadata() {
    assert.strictEqual('10', new Render(htmlString).meta().width)
    assert.strictEqual('ready', new Render(htmlString).meta().callback)
  },

  printOptions() {
    assert.strictEqual(10, new Render(htmlString).printOptions().paperWidth)
  },

  toPdf() {
    td.when(this.htmlPdf.create(htmlString, td.matchers.isA(Object))).thenReturn(true)
    assert.strictEqual(true, new Render(htmlString).toPdf())
  },

  filename: {
    specified() {
      assert.strictEqual('fancyfilename.pdf', new Render(htmlString).filename())
    },

    notSpecified() {
      assert(new Render('').filename().match(/\.pdf$/))
    }
  }
}
