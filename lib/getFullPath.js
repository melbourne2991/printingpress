const path = require('path')

module.exports = function getFullPath() {
  return path.join(process.cwd(), ...arguments)
}