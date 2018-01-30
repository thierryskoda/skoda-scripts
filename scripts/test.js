process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

const isCI = require('is-ci')
const getPkg = require('read-pkg-up')

const defaultConfig = require('../config/jest.config')
const { getArgs } = require('../utils/cli')
const { hasProp } = require('../utils/fn')
const { hasFileRelative } = require('../utils/fs')

const args = getArgs()
const { pkg } = getPkg.sync()

const hasJestProp = hasProp('jest')

const watch =
  isCI ||
  args.includes('--no-watch') ||
  args.includes('--coverage') ||
  args.includes('--updateSnapshot') ||
  args.includes('-u')
    ? []
    : ['--watch']

const config =
  args.includes('--config') ||
  hasFileRelative('jest.config.js') ||
  hasJestProp(pkg)
    ? []
    : ['--config', JSON.stringify(defaultConfig)]

require('jest').run([...config, ...watch, ...args])
