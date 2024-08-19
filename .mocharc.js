module.exports = {
  color: true,
  diff: true,
  require: [
    'mocha.tsx.js',
    'tsconfig-paths/register'
  ],
  extension: ['ts', 'js'],
  reporter: 'spec',
  spec: ['src/**/__test__/*.ts'],
  slow: '75',
  timeout: '60000',
  ui: 'bdd'
};
