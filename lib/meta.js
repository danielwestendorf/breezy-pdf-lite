const { JSDOM } = require('jsdom')

module.exports = (htmlString) => {
  const meta = {}
  const dom  = new JSDOM(htmlString)

  const metaTags = dom.window.document.querySelectorAll('meta[name^="breezy-pdf-"]')

  for (var i = 0; i < metaTags.length; i++) {
    const tag = metaTags[i]
    const name = tag.name.replace(/^breezy-pdf-/, '')

    meta[name] = tag.content
  }

  return meta
}
