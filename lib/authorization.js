const debug = require('debug')

module.exports = (options) => {
  this.log = debug('breezy-pdf-lite:authorization')
  this.options = options

  return (req, res, next) => {
    if (!this.options.privateToken) {
      return next()
    }

    this.log('Validating Private Token...')
    const authHeader = new String(req.get('Authorization'))

    if (authHeader.replace(/Bearer (.*)$/i, '$1') !== this.options.privateToken) {
      this.log('Invalid Private Token')

      res.status(401).send('Invalid Private Token')
    } else {
      this.log('Valid Private Token')
      next()
    }
  }
}
