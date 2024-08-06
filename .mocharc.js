module.exports = {
  require: [
    'mocha.ts-node.js',
    'tsconfig-paths/register'
  ],
  reporter: 'spec',
  spec: 'src/**/__test__/*.ts'
};
