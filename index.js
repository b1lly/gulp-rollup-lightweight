const stream = require('stream');

module.exports = function rollupStream(opts = {}) {
  let rollup = opts.rollup || require('rollup'),
      readable = new stream.Readable();

  // Implement the Rollup Promise and
  // wrap the result in a gulp-friendly stream
  rollup
    // Create a bundle
    .rollup(opts)
    // Generate code from the bundle
    .then((bundle) => {
      return bundle.generate(opts);
    })
    // Wrap the resulted code in a stream
    .then((result) => {
      // Push the bundled code into our stream
      stream.push(result.code);

      // Optionally handle creating a source map
      if (opts.sourcemap || opts.sourceMap) {
        stream.push('\n//# sourceMappingURL=');
        stream.push(result.map.toUrl());
      }
    })
    .catch((error) => {
      setImmediate(() => stream.emit('error', error));
    });

  return readable;
}