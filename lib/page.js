const path = require('path')
const beautify = require('js-beautify')
const mkdirp = require('mkdirp')
const fs = require('fs')
const getFullPath = require('./getFullPath')

const beautifyOptions = {
  indent_size: 2,
  indent_inner_html: true,
  unformatted: ['code', 'pre', 'em', 'strong', 'span']
}

module.exports = function Page(options) {
  const fullPath = getFullPath(this.config.distPath, options.path)
  const parsedPath = path.parse(fullPath)
  const { dir, base, ext } = parsedPath

  if(ext.length) {
    mkdirp.sync(dir)
    fs.writeFileSync(fullPath, options.data, 'utf8')
  } else {
    mkdirp.sync(fullPath)
    fs.writeFileSync(`${fullPath}/index.html`, beautify.html(options.data, beautifyOptions), 'utf8')
  }
}