# gulp-rollup-lightweight
A [Gulp] plugin that makes working with [Rollup] easy!

It's a thin light-weight wrapper around the Rollup JS API that wraps
the [Rollup] Promise in a Readable Stream.

## Installation
```bash
npm install --save-dev gulp-rollup-stream
```

## Basic Usage
```js
const { dest, src } = require('gulp');
const rollup = require('gulp-rollup-stream');
const source = require('vinyl-source-stream');

function bundle() {
  return rollup({
    input: './src/main.js',
    output: {
      format: 'umd'
    }
  })
  .pipe(source('app.js'))
  .pipe(dest('./dist'))
}
```


## Usage for a mixture of ES6 & CJS Modules
```js
const { dest, src } = require('gulp');
const rollup = require('gulp-rollup-stream');
const source = require('vinyl-source-stream');

// Helps to resolve NPM modules
const resolve = require('rollup-plugin-node-resolve');
// Used for CJS resolution
const commonjs = require('rollup-plugin-commonjs')

function bundle() {
  return rollup({
    input: './src/main.js',
    output: {
      format: 'umd'
    },
    plugins: [
      resolve(),
      commonjs()
    ]
  })
  .pipe(source('app.js'))
  .pipe(dest('./dist'))
}
```

## Usage with custom Rollup
```js
const { dest, src } = require('gulp');
const rollup = require('gulp-rollup-stream');
const source = require('vinyl-source-stream');

function bundle() {
  return rollup({
    // Provide your custom Rollup
    rollup: require('rollup'),
    input: './src/main.js',
    output: {
      format: 'umd'
    }
  })
  .pipe(source('app.js'))
  .pipe(dest('./dist'))
}

```

[Rollup]: https://www.npmjs.com/package/rollup
[gulp]: http://gulpjs.com/
