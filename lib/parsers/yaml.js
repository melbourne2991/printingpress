const yamljs = require('yamljs');

module.exports = function yaml(str) {
  return yamljs.parse(str)
}