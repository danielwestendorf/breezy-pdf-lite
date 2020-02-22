const assert = require('assert')
let Render

let htmlString = `
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

const metadata = {
  width:    '10',
  callback: 'ready',
  timeout:  '3000'
}

module.exports = {
  beforeEach() {
    this.htmlPdf = td.replace('html-pdf-chrome')

    Render = require('../../lib/render')
  },

  metadata() {
    assert.equal('10', new Render(htmlString).meta().width)
    assert.equal('ready', new Render(htmlString).meta().callback)
  },

  printOptions() {
    assert.equal(10, new Render(htmlString).printOptions().paperWidth)
  },

  toPdf() {
    td.when(this.htmlPdf.create(htmlString, td.matchers.isA(Object))).thenReturn(true)
     assert.equal(true, new Render(htmlString).toPdf())
  },

  filename: {
    specified() {
      assert.equal('fancyfilename.pdf', new Render(htmlString).filename())
    },

    notSpecified() {
      assert(new Render('').filename().match(/\.pdf$/))
    },

    alreadyHasExtension() {
      htmlString = `
        <html>
          <head>
            <meta name='breezy-pdf-filename' content='fancyfilename.pdf'/>
          </head>
          <body>
          </body>
        </html>
      `.trim()

      assert.equal('fancyfilename.pdf', new Render(htmlString).filename())
    }
  }
}
