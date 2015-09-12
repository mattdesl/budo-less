#!/usr/bin/env node
var budo = require('budo')
var htmlStream = require('simple-html-index')
var url = require('url')
var path = require('path')
var assign = require('object-assign')
var minimist = require('minimist')
var lessMiddleware = require('simple-less-middleware')
 
var args = process.argv.slice(2)
var argv = parseArgs(args)

var lessFile = argv.less ? path.resolve(argv.less) : undefined
var cssUrl = getCssUrl(lessFile)
var middleware = argv.less ? lessMiddleware(lessFile, cssUrl, argv) : undefined

var app = budo.cli(args, {
  middleware: middleware,
  defaultIndex: defaultIndex,
  // ensure default LiveReload integration is disabled
  live: false
})

// if --version or --help
if (!app) {
  process.exit(0)
}

// setup default LESS/HTML reload
if (argv.live) {
  app
    .live()
    .watch(['**/*.{html,less}'])
    .on('watch', function (ev, file) {
      if (path.resolve(file) === path.resolve(lessFile)) {
        app.reload(cssUrl)
      } else {
        app.reload(file)
      }
    })
    .on('pending', app.reload.bind(app))
}

function defaultIndex (opt) {
  return htmlStream(assign({
    css: cssUrl
  }, opt))
}

function getCssUrl (file) {
  if (!file) return ''
  var ext = path.extname(file)
  var filename = path.basename(file, ext) + '.css'
  return url.parse(filename).pathname
}

function parseArgs (args) {
  var opt = minimist(args, {
    string: [ 'less', 'css', 'autoprefix', 'paths' ],
    boolean: [ 'compress', 'live' ]
  })

  opt.paths = (opt.paths||'').split(path.delimiter)
  return opt
}
