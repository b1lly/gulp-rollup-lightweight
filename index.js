const stream = require('stream');

module.exports = function(inputOptions = {}, outputOptions = inputOptions) {
  // Allow developer to provide a custom rollup,
  // otherwise use the default found from NPM modules
  let rollup = inputOptions.rollup || require('rollup'),
      readable = new stream.Readable();

  // Readable requires this to be a valid interface
  readable._read = function() {};

  // Wrap the rollup Promise in a gulp-friendly Readable stream
  // Rollup works in two steps:
  // 1. Create a {bundle} of all the files
  // 2. Generates {output} based on the bundled
  rollup
    .rollup(inputOptions)
    .then((bundle) => {
      return bundle.generate(outputOptions);
    })
    .then((output) => {
      let _opts = Object.assign({}, inputOptions, outputOptions);

      // Older versions of rollup attached code directly to the output,
      // where newer versions contain the output within an output array
      if (!output.code) {
        output = output.output[0];
      }

      // Push the bundled code into our readable stream
      readable.push(output.code);

      // Optionally append the source map
      if (_opts.sourcemap || _opts.sourceMap || _opts.output.sourcemap || _opts.output.sourceMap) {
        readable.push('\n//# sourceMappingURL=');
        readable.push(output.map.toUrl());
      }

      // EOF-signaling `null` chunk
      readable.push(null);
    })
    .catch((error) => {
      setImmediate(() => readable.emit('error', error));
    });

  return readable;
}