const stream = require('stream');

module.exports = function(opts = {}) {
  // Allow developer to provide custom rollup,
  // otherwise use the default found from NPM modules
  let rollup = opts.rollup || require('rollup'),
      readable = new stream.Readable();

  // Readable hack ;P
  readable._read = function() {};

  // Wrap the rollup Promise in a gulp-friendly Readable stream
  rollup
    // Create a bundle
    .rollup(opts)
    // Generate code from the bundle
    .then((bundle) => {
      return bundle.generate(opts);
    })
    // Wrap the resulted code in our readable stream
    .then((result) => {
      result = result.output[0];
      // Push the bundled code into our readable stream
      readable.push(result.code);

      // Optionally append the source map
      if (opts.sourcemap || opts.sourceMap) {
        readable.push('\n//# sourceMappingURL=');
        readable.push(result.map.toUrl());
      }

      // EOF-signaling `null` chunk
      readable.push(null);
    })
    .catch((error) => {
      setImmediate(() => readable.emit('error', error));
    });

  return readable;
}