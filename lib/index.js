const getFullPath = require('./getFullPath')
const parseContent = require('./parseContent')
const utils = require('./utils')
const Template = require('./template')
const Page = require('./page')

function PrintingPress(config) {
  this.config = config
  this.content = parseContent(getFullPath(config.contentPath))
  this.Template = Template.bind(this)
  this.Page = Page.bind(this)
}

module.exports = function(config) {
  return new PrintingPress(config)
}

module.exports.utils = utils