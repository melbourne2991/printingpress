const fs = require('fs')
const parseContent = require('./parseContent')
const getFullPath = require('./getFullPath')
const handlebars = require('handlebars')
const path = require('path')
const mkdirp = require('mkdirp')
const beautify = require('js-beautify')

const beautifyOptions = {
  indent_size: 2,
  indent_inner_html: true,
  unformatted: ['code', 'pre', 'em', 'strong', 'span']
}

class PrintingPress {
  constructor(config) {
    this.config = config
    this.content = parseContent(getFullPath(config.contentPath))
  }

  Template(type) {
    let fn = type;

    // if type is string assume its a path
    if(typeof type === 'string') {
      const fullPath = getFullPath(this.config.templatesPath || '', type)
      const str = fs.readFileSync(fullPath, {encoding: 'utf8'})
      fn = handlebars.compile(str)
    }

    return (data) => {
      return fn(data)
    }
  }

  Page(options) {
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
}

module.exports = PrintingPress