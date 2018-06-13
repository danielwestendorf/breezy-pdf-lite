const assert = require('assert')
const meta   = require('../../lib/meta')

const htmlString = `
  <html>
    <head>
      <meta name='breezy-pdf-foo' content='bar'/>
    </head>
    <body>
      <meta name='breezy-pdf-foo' content='foobar'/>
      <meta name='breezy-pdf-baz' content='spaz'/>
    </body>
  </html>
`.trim()

module.exports = {
  extractsMeta() {
    assert.deepStrictEqual({
      foo: 'foobar',
      baz: 'spaz'
    }, meta(htmlString))
  }
}
