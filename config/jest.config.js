module.exports = {
  collectCoverageFrom: [
    'lib/**/*.js',
    'route/**/*.js',
    'schema/**/*.js',
    '*.js',
    '!jest.config.js',
  ],
  testMatch: ['<rootDir>/tests/**/*.js'],
  testEnvironment: 'node',
}
