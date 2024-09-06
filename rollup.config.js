const path = require('path');
const alias = require('@rollup/plugin-alias');
const typescript = require('rollup-plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
const nodePolyfills = require('rollup-plugin-polyfill-node');

module.exports = function (config) {
  const extensions = ['.ts', '.js'];
  // umd
  config.push({
    input: 'src/index.ts',
    output: {
      file: 'umd/1money-js-sdk.min.js',
      format: 'umd',
      name: '$1money-js-sdk',
      exports: 'named',
      compact: true
    },
    plugins: [
      nodeResolve({
        extensions,
        preferBuiltins: true,
        browser: true
      }),
      commonjs(),
      typescript({
        target: 'es2015',
        module: 'ESNext',
        lib: ['es5', 'es6', 'es2015', 'es2016', 'dom'],
        declaration: false
      }),
      babel({
        exclude: 'node_modules/**',
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
        babelHelpers: 'runtime',
        extensions
      }),
      json(),
      terser()
    ]
  });

  config.forEach(v => {
    // just keep the reference for third-party libs
    v.external = ['axios'];

    v.plugins.unshift(
      nodePolyfills(),
      alias({
        entries: [
          // !todo not working (such as @/constants in utils/logger.ts)
          { find: '@/', replacement: path.resolve(__dirname, 'src/') }
        ]
      })
    )
  });

  return config;
}
