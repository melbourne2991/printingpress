const PrintingPress = require('./PrintingPress')
const utils = require('./utils')

module.exports = function(config) {
  return new PrintingPress(config)
}

module.exports.utils = utils