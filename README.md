# budo-less

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Experiments with LESS and [budo](https://github.com/mattdesl/budo). For a custom dev script, e.g. using PostCSS or SASS, see [API Example](#api-example).

## Install

```sh
npm install budo-less -g
```

For pretty printing, you can pipe to [garnish](https://github.com/mattdesl/garnish). 

## Example

```sh
budo-less src/index.js:bundle.js --live --less style.less | garnish
```

Now, when you hit [http://localhost:9966/](http://localhost:9966/), the default HTML index will look like this:

```html
<!doctype html>
<head>
  <title>hello</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

When the server requests `style.css`, it will pre-process your specified `--less` file on the fly, writing CSS to the response.

When you make changes to `.less` files in your working directory, it will trigger a CSS LiveReload without refreshing the page.

## Usage

The CLI behaves like [budo](https://github.com/mattdesl/budo), with the following extra options:

```sh
Usage:
  budo-less [opts] -- [browserifyOpts]

Options:
  --live        enable LiveReload for HTML/LESS
  --less        path to your LESS entry point
  --css         optional URL for the CSS href
  --paths       optional list of paths for LESS (colon-delimited in unix)
  --autoprefix  optional; enable autoprefix for given browsers
```

The `--css` flag defaults to the filename of `--less`. 

Examples:

```sh
budo-less foo.js --less=foo/main.less | garnish
budo-less foo.js --css=static/main.css --less=src/main.less
budo-less foo.js --less=main.css --autoprefix="last 2 versions"
```

## API Example

This is fairly simple to achieve using the budo API.

See [test/api-example.js](test/api-example.js) for an example of this.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/budo-less/blob/master/LICENSE.md) for details.
