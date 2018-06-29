# BreezyPDF Lite: HTML to PDF generation as a Service
### Submit a slug of HTML, get a Google Chrome rendered PDF back.
[![Build Status](https://travis-ci.org/danielwestendorf/breezy-pdf-lite.svg?branch=master)](https://travis-ci.org/danielwestendorf/breezy-pdf-lite) [![Coverage Status](https://coveralls.io/repos/github/danielwestendorf/breezy-pdf-lite/badge.svg?branch=master)](https://coveralls.io/github/danielwestendorf/breezy-pdf-lite?branch=master)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

A quick to stand up HTML to PDF service powered by headless Google Chrome. Deploy with one click and start generating PDF's from your web application or command line.

### Looking for something more robust?
BreezyPDF Lite was extracted from [BreezyPDF](https://breezypdf.com) as a light weight alternative for new apps. As your software grows, a 1:1 server instance/render ratio will become slow and limiting.

See [BreezyPDF.com](https://breezypdf.com) for Hosted and Enterprise versions which prioritize performance, redundancy, and usability.

### Getting Started

##### 1. Submit HTML to be converted
This is done with a `POST` request the the web server. We'll use some example HTML for this example.
```sh
  curl -X POST -H 'Authorization: Bearer PRIVATE_TOKEN_DEFINED_IN_SERVER_ENVIRONMENT' \
    http://url-of-your-breezy-pdf-lite-server/render/html \
    -d "`curl https://raw.githubusercontent.com/danielwestendorf/breezy-pdf-lite/master/sample.html`" \
    -o example.pdf
```

This will create the PDF in the current directory by the name of `example.pdf`.

##### 2. Configure with `meta` tags (optional)
All configuration for the rendering of your PDF can be configured by meta tags within the HTML you submit. Simply insert the needed meta tag into the head or body of the HTML.

```html
  <meta name="breezy-pdf-width" content="10">
```

| Tag name                   | Default Value      | Description                                                |
| -------------              |:-------------:     | -----                                                      |
| breezy-pdf-width           | 8.5                | PDF page width in inches                                   |
| breezy-pdf-height          | 11                 | PDF page height in inches                                  |
| breezy-pdf-cssPageSize     | false              | Use page size defined by CSS                               |
| breezy-pdf-marginTop       | 0.4                | Top margin                                                 |
| breezy-pdf-landscape       | false              | Print in landscape mode                                    |

View the all the configuration options and their documentation [here](https://docs.breezypdf.com/metadata).

###### 2.a Print Options
There are a number of options for how you want the PDF to be rendered, including height, width, margins, footers, and headers.

###### 2.b Completion Triggers
You might be rendering a Javascript heavy page, so it's helpful to let `chrome` know when the page is done rendering and ready to be converted to PDF. The default completion trigger is a timer of 5000ms.



### Deployment

#### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Click the deployment button to get the system running on Heroku

### Clients

- [Ruby/Rack/Rails](https://github.com/danielwestendorf/breezy_pdf_lite-ruby)
- [Node.js](https://github.com/danielwestendorf/breezy-pdf-lite/issues/4)
- [Browserside JS](https://github.com/danielwestendorf/breezy-pdf-lite/issues/5)
- [Java](https://github.com/danielwestendorf/breezy-pdf-lite/issues/6)
- [Swift](https://github.com/danielwestendorf/breezy-pdf-lite/issues/7)
- [Python](https://github.com/danielwestendorf/breezy-pdf-lite/issues/8)
- [PHP](https://github.com/danielwestendorf/breezy-pdf-lite/issues/9)

#### Non-Heroku

1. Install node & yarn
2. `yarn install`
4. Set the Environment variables specified below
5. Start the web process `node index.js`

### Configuration
Set the Environment/Heroku Config Vars

| ENV Variable               | Default Value      | Description                                                |
| -------------              |:-------------:     | -----                                                      |
| PRIVATE_API_TOKEN          | generated secret   | A private key for accessing the API.                       |



Set `DEBUG` Config var to `breezy-pdf-lite:*` to get debugged output.


### Run Tests

`$ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --interpreter none --headless   --disable-gpu   --disable-translate   --disable-extensions   --disable-background-networking   --safebrowsing-disable-auto-update   --disable-sync   --metrics-recording-only   --disable-default-apps   --no-first-run   --mute-audio   --hide-scrollbars   --remote-debugging-port=9222`

`$ npm test`
