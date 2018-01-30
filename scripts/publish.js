const fs = require('fs')
const packageJsonFile = require('../package.json')

const newPackageJsonFile = {
  ...packageJsonFile,
  version: `0.0.${parseInt(packageJsonFile.version.split('.')[2]) + 1}`,
}

fs.writeFileSync('package.json', JSON.stringify(newPackageJsonFile, null, 2))

console.log('New npm version:', newPackageJsonFile.version)
