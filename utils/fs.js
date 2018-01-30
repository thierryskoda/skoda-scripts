const path = require('path')
const fs = require('fs')

const hasFile = base => (...p) => fs.existsSync(path.resolve(base, ...p))

const hasFileRelative = hasFile(process.cwd())

module.exports = {
  hasFile,
  hasFileRelative,
}
