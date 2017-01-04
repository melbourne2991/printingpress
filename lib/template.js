const fs = require('fs')
const handlebars = require('handlebars')
const getFullPath = require('./getFullPath')

module.exports = function Template(type) {
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