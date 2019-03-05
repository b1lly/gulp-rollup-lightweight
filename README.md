<!-- BADGES/ -->

<span class="badge-travisci"><a href="http://travis-ci.com/b1lly/gulp-rollup-lightweight?branch=master" title="Check this project's build status on TravisCI"><img src="https://travis-ci.com/b1lly/gulp-rollup-lightweight.svg?branch=master" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/gulp-rollup-lightweight" title="View this project on NPM"><img src="https://img.shields.io/npm/v/gulp-rollup-lightweight.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/gulp-rollup-lightweight" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/gulp-rollup-lightweight.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/b1lly/gulp-rollup-lightweight" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/b1lly/gulp-rollup-lightweight.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/b1lly/gulp-rollup-lightweight#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/b1lly/gulp-rollup-lightweight.svg" alt="Dev Dependency Status" /></a></span>

<!-- /BADGES -->


# gulp-rollup-lightweight
A [Gulp] plugin that makes working with [Rollup] easy!

- Supports latest version of gulp (CLI 2.0.1 & local 4.0.0)
- Supports latest version of rollup (CLI v1.4.1)

It's a thin light-weight wrapper around the Rollup JS API that wraps
the [Rollup] Promise in a Readable Stream.

## Installation
```bash
npm install --save-dev gulp-rollup-lightweight
```

## Basic Usage
```js
const { dest } = require('gulp');
const rollup = require('gulp-rollup-lightweight');
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
const { dest } = require('gulp');
const rollup = require('gulp-rollup-lightweight');
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
const { dest } = require('gulp');
const rollup = require('gulp-rollup-lightweight');
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
