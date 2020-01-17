# BreezyPDF Lite: HTML to PDF generation as a Service
### Submit a slug of HTML, get a Google Chrome rendered PDF back.
[![Build Status](https://travis-ci.org/danielwestendorf/breezy-pdf-lite.svg?branch=master)](https://travis-ci.org/danielwestendorf/breezy-pdf-lite) [![Coverage Status](https://coveralls.io/repos/github/danielwestendorf/breezy-pdf-lite/badge.svg?branch=master)](https://coveralls.io/github/danielwestendorf/breezy-pdf-lite?branch=master) [![Open Source Helpers](https://www.codetriage.com/danielwestendorf/breezy-pdf-lite/badges/users.svg)](https://www.codetriage.com/danielwestendorf/breezy-pdf-lite)

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

| Tag name                    | Default Value      | Description                                                |
| -------------               |:-------------:     | -----                                                      |
| breezy-pdf-filename         | output.pdf         | Name of the pdf                                            |
| breezy-pdf-width            | 8.5                | PDF page width in inches                                   |
| breezy-pdf-height           | 11                 | PDF page height in inches                                  |
| breezy-pdf-cssPageSize      | false              | Use page size defined by CSS                               |
| breezy-pdf-marginTop        | 0.4                | Top margin                                                 |
| breezy-pdf-marginRight      | 0.4                | Right margin                                               |
| breezy-pdf-marginBottom     | 0.4                | Bottom margin                                              |
| breezy-pdf-marginLeft       | 0.4                | Left margin                                                |
| breezy-pdf-landscape        | false              | Print in landscape mode                                    |
| breezy-pdf-scale            | 1                  | Scale the viewport before converting to pdf                |
| breezy-pdf-displayBackground| false              | Render the background in the HTML is included in the PDF   |

View the all the configuration options and their documentation [here](https://docs.breezypdf.com/metadata).

##### 2.a Header and Footer Templates
Configure the HTML template to be included at the top and bottom of every page. Include elements with the classes of date, title, pageNumber, and totalPages to have values inserted at render time. At this time, any images must be DataURI encoded and styles must be specified within the template. Defaults to no HTML.

| CSS class | Description |
| --------- | ----------- |
| date      | Formatted render date displayed in UTC |
| title     | Title of the document specified by the title tag |
| pageNumber| The count of the current page in the PDF |
| totalPages| The total count of pages in the PDF |

##### 2.b Completion Triggers
Notify the rendering engine when your rich content has completed loading and the PDF is ready to be rendered. Most typically used when complex JavaScript needs to be evaluated. The default completion trigger is a timer of 5000ms. If multiple completion triggers, the first trigger used will be adopted based on the order in which they're specified here.

###### Callback
A JavaScript function in the global namespace which will be defined by the renderer. Your code will be invoke this callback when the document is ready for PDF rendering. Optional timeout can be specified in ms, defaulting to 5000ms.

```html
<meta name="breezy-pdf-callback" content="myWorkHereIsDoneCallback">
<meta name="breezy-pdf-timeout" content="3000">
```
```js
function() {
    // My hard working JS here
    window.myWorkHereIsDoneCallback();
}
```

###### Event
A JavaScript event which will be dispatched on an element when the document is ready for PDF rendering. Optional CSS element selector can be specified, defaulting to document. Optional timeout can be specified in ms, defaulting to 5000ms.

```html
<meta name="breezy-pdf-event" content="myCustomEvent">
<meta name="breezy-pdf-element" content="#myContainer">
<meta name="breezy-pdf-timeout" content="3000">
```

```js
var event = new CustomEvent('myCustomEvent');
var element = document.getElementBydId('myContainer');

element.dispatchEvent(event);
```

###### Element
The CSS selector of an element which will be inserted into the document when the document is ready for PDF rendering. Optional timeout can be specified in ms, defaulting to 5000ms.

```html
<meta name="breezy-pdf-element" content="#last-page > #last-element">
<meta name="breezy-pdf-timeout" content="3000">
```

```js
function() {
    // My hard working JS here
    var lastPage    = document.getElementById('#last-page');
    var lastElement = document.createElement('div');
    
    lastElement.id = 'last-element';
    
    lastPage.appendChild(lastElement);
}
```

###### Variable
The variable in the global namespace which will be defined when the document is ready for PDF rendering. Optional timeout can be specified in ms, defaulting to 5000ms.

```html
<meta name="breezy-pdf-variable" content="myWorkHereIsDoneVariable">
```

```js
function() {
    // My hard working JS here
    window.myWorkHereIsDoneVariable = true;
}
```

###### Timer
The predefined amount of time to wait before the document is rendered to PDF. Timer should be specified in ms, defaulting to 5000ms.

```html
<meta name="breezy-pdf-timer" content="10000">
```


### Deployment

#### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Click the deployment button to get the system running on Heroku

### Clients

- [Ruby/Rack/Rails](https://github.com/danielwestendorf/breezy_pdf_lite-ruby)
- [PHP](https://github.com/jitendra-1217/breezy-pdf-lite-php)
- [Node.js](https://github.com/danielwestendorf/breezy-pdf-lite-client-js)
- [Browserside JS](https://github.com/danielwestendorf/breezy-pdf-lite/issues/5)
- [Java](https://github.com/danielwestendorf/breezy-pdf-lite/issues/6)
- [Swift](https://github.com/danielwestendorf/breezy-pdf-lite/issues/7)
- [Python](https://github.com/danielwestendorf/breezy-pdf-lite/issues/8)
- [Go](https://github.com/danielwestendorf/breezy-pdf-lite/issues/10)

#### Docker

`docker run -it -p 5002:5002 -e "DEBUG=breezy-pdf-lite:*" -e "PORT=5002" -e "PRIVATE_TOKEN=YOURSUPERSECRETTOKEN" danielwestendorf/breezy-pdf-lite:latest`

#### Non-Heroku

1. Install node & yarn
2. `yarn install`
4. Set the Environment variables specified below
5. Start the web process `node index.js`

### Configuration
Set the Environment/Heroku Config Vars

| ENV Variable               | Default Value      | Description                                                |
| -------------              |:-------------:     | -----                                                      |
| PRIVATE_TOKEN              | generated secret   | A private key for accessing the API.                       |



Set `DEBUG` Config var to `breezy-pdf-lite:*` to get debugged output.


### Run Tests

`$ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --interpreter none --headless   --disable-gpu   --disable-translate   --disable-extensions   --disable-background-networking   --safebrowsing-disable-auto-update   --disable-sync   --metrics-recording-only   --disable-default-apps   --no-first-run   --mute-audio   --hide-scrollbars   --remote-debugging-port=9222`

`$ npm test`
