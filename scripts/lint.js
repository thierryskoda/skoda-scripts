const path = require('path')
const spawn = require('cross-spawn')
const getPkg = require('read-pkg-up')

const { getArgs } = require('../utils/cli')
const { hasFileRelative } = require('../utils/fs')
const { hasProp } = require('../utils/fn')

const hasEslintConfigProp = hasProp('eslintConfig')
const hasEslintIgnoreProp = hasProp('eslintConfig')

const args = getArgs()
const { pkg } = getPkg.sync()

const config =
  args.includes('--config') ||
  hasFileRelative('.eslintrc') ||
  hasFileRelative('.eslintrc.js') ||
  hasFileRelative('.eslintrc.json') ||
  hasEslintConfigProp(pkg)
    ? []
    : ['--config', path.join(__dirname, '../config/.eslintrc.json')]

const ignore =
  args.includes('--ignore-path') ||
  hasFileRelative('.eslintignore') ||
  hasEslintIgnoreProp(pkg)
    ? []
    : ['--ignore-path', path.join(__dirname, '../config/eslintignore')]

const cache = args.includes('--no-cache') ? [] : ['--cache']

const filesToApply = ['.', 'bin/*']

const result = spawn.sync(
  'yarn', // TODO: resolve eslint bin instead of using yarn
  ['eslint', ...config, ...ignore, ...cache, ...args, ...filesToApply],
  { stdio: 'inherit' }
)

process.exit(result.status)
