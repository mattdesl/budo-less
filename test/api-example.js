/*
  This is an example of a custom browserify 
  development server using the budo API.
  
  This transpiles LESS as a CSS file is requested,
  but it could just as easily be using SASS, PostCSS, etc.
  
  To run:
  
    npm run api-example
 */ 

var budo = require('budo')
var path = require('path')
var less = require('simple-less-middleware')
var html = require('simple-html-index')

// set process.cwd() to this folder
process.chdir(__dirname)

var lessFile = 'style.less'
var cssUrl = 'main.css'
var middleware = less(lessFile, cssUrl, {
  compress: false,
  autoprefixer: 'last 2 browsers'
})

var app = budo('simple.js', {
  // print to stdout
  stream: process.stdout,
  // pre-process LESS files as they are requested
  middleware: middleware,
  // provide <link href> in default index.html
  defaultIndex: defaultIndex
})
  // enable LiveReload server
  .live()
  // enable chokidar for the given file globs
  .watch(['**/*.{html,less}'])
  // when file is changed
  .on('watch', function (ev, file) {
    if (path.resolve(file) === path.resolve(lessFile)) {
      // tell LiveReload to re-request 'main.css'
      app.reload(cssUrl)
    } else {
      // handle HTML reloads
      app.reload(file)
    }
  })
  // when bundle starts changing, reload page entirely
  .on('pending', function () {
    app.reload()
  })
  
function defaultIndex (opt) {
  return html({ entry: opt.entry, css: cssUrl })
}