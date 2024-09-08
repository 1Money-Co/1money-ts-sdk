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

  config.forEach(v => {
    // just keep the reference for third-party libs
    v.external = ['axios', 'bignumber.js', 'dayjs', 'chalk'];
    v.plugins.unshift(
      alias({
        entries: [
          // !todo not working (such as @/constants in utils/logger.ts for commonjs export)
          { find: '@/', replacement: path.resolve(__dirname, 'src/') }
        ]
      }),
      nodePolyfills()
    )
  });

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
    external: ['axios'],
    plugins: [
      alias({
        entries: [
          { find: '@/', replacement: path.resolve(__dirname, 'src/') }
        ]
      }),
      nodePolyfills(),
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

  return config;
}
