const path = require('path');
const alias = require('@rollup/plugin-alias');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const terser = require('@rollup/plugin-terser');
const nodePolyfills = require('rollup-plugin-polyfill-node');
const tscAlias = require('tsc-alias');

module.exports = function (getConfig) {
  const config = getConfig(false);
  const extensions = ['.ts', '.js'];
  config.forEach(v => {
    // just keep the reference for third-party libs
    v.external = ['axios', 'viem', '@noble/secp256k1', '@ethereumjs/rlp'];
    v.plugins.unshift(
      alias({
        entries: [
          { find: '@/', replacement: path.resolve(__dirname, 'src/') }
        ]
      }),
      nodePolyfills(),
    );
    v.plugins.push(
      {
        name: 'tscAlias',
        async writeBundle() {
          return tscAlias.replaceTscAliasPaths({
            resolveFullPaths: true,
            outDir: './lib'
          });
        },
      },
      {
        name: 'tscAlias',
        async writeBundle() {
          return tscAlias.replaceTscAliasPaths({
            resolveFullPaths: true,
            outDir: './es'
          });
        },
      }
    );
  });

  // umd
  config.push({
    input: 'src/index.ts',
    output: {
      file: 'umd/1money-ts-sdk.min.js',
      format: 'umd',
      name: '$1money',
      exports: 'named',
      compact: true
    },
    plugins: [
      alias({
        entries: [
          { find: '@/', replacement: path.resolve(__dirname, 'src/') },
          { find: '@noble/secp256k1', replacement: path.resolve(__dirname, 'node_modules/@noble/secp256k1/index.js') }
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
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        include: ['src/**/*.ts'],
        compilerOptions: {
          target: 'es2015',
          module: 'ESNext',
          lib: ['es5', 'es6', 'es2015', 'es2016', 'dom'],
          declaration: false,
          outDir: 'umd',
        }
      }),
      json(),
      terser()
    ]
  });

  return config;
}
