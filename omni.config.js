'use strict';

const path = require('path');
const rollup = require('./rollup.config');

module.exports = {
  type: 'toolkit', // project type, please don't modify

  dev: {
    port: 6200, // dev-server port
    // host: 'dev.domain.com', // dev-server host
    serverType: 'dumi' // dev-server type
  },

  build: {
    // auto release project after build success
    autoRelease: false,

    // the build source directory
    // must be a absolute path
    srcDir: path.resolve('src'),

    // the directory for compiled project
    // must be a absolute path
    outDir: path.resolve('lib'),

    // es6 module compiled directory
    // must be a absolute path
    esmDir: path.resolve('es'),

    // build tool, support tsc and rollup
    tool: 'rollup',

    // The callback will be call in the build-process
    // You can return your custom build configuration
    configuration: rollup,

    reserve: {
      assets: [] // reserve assets paths
    },

    preflight: {
      typescript: true, // whether or not process the ts or tsx files
      test: true, // whether or not process unit-test
      eslint: true, // whether or not process eslint checking
      prettier: true // whether or not process prettier checking
    }
  },

  release: {
    // auto build project before release process
    autoBuild: false,

    // auto set tag according to the current version
    autoTag: false,

    // project git repo url
    git: 'git@github.com:1Money-Co/1money-js-sdk.git',

    // npm depository url
    npm: '',

    preflight: {
      test: true, // whether or not process unit-test
      eslint: true, // whether or not process eslint checking
      prettier: true, // whether or not process prettier checking
      commitlint: true, // whether or not process commitlint checking
      branch: 'master' // only can release in this branch, set empty string to ignore this check
    }
  },

  template: {
    // the root directory for generate template
    // must be a absolute path
    root: path.resolve('src'),

    // whether or not generate typescript
    typescript: true,

    // whether or not generate unit test frame
    test: true,

    // whether or not generate README.md
    readme: true
  },

  plugins: []
};
