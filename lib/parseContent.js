const fs = require('fs');
const path = require('path');
const parsers = require('./parsers');

module.exports = function parseContent(uri) {
  const tree = {}
  const files = fs.readdirSync(uri)

  files.forEach((fileName) => {
    const fileUri = path.join(uri, fileName)
    const { ext } = path.parse(fileName)

    if(fs.lstatSync(fileUri).isDirectory()) {
      let content = parseContent(fileUri)
      tree[fileName] = content
    } else {
      const parser = parsers[ext.split('.')[1]]
      const fileContents = fs.readFileSync(fileUri, {encoding: 'utf8'})

      let content = parser ? parser(fileContents) : fileContents

      tree[fileName] = content
    } 
  })

  return tree
}