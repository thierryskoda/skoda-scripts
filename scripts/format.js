const path = require('path')
const spawn = require('cross-spawn')
const getPkg = require('read-pkg-up')

const { getArgs } = require('../utils/cli')
const { hasFileRelative } = require('../utils/fs')
const { hasProp } = require('../utils/fn')

const hasPrettierProp = hasProp('prettierrc')

const args = getArgs()
const { pkg } = getPkg.sync()

const config =
  args.includes('--config') ||
  hasFileRelative('.prettierrc') ||
  hasFileRelative('prettierrc.js') ||
  hasFileRelative('prettier.config.js') ||
  hasPrettierProp(pkg)
    ? []
    : ['--config', path.join(__dirname, '../config/.prettierrc')]

const ignore =
  args.includes('--ignore-path') || hasFileRelative('.prettierignore')
    ? []
    : ['--ignore-path', path.join(__dirname, '../config/prettierignore')]

const write = args.includes('--no-write') ? [] : ['--write']

const filesToApply = ['**/*.js', 'bin/*']

const result = spawn.sync(
  'yarn', // TODO: resolve prettier bin instead of using yarn
  ['prettier', ...config, ...ignore, ...write, ...filesToApply],
  { stdio: 'inherit' }
)

process.exit(result.status)
