const marked = require('marked');
const yaml = require('./yaml');

const frontMatterDelimitter = '---'

function extract(str) {
  if(str.split(/\r\n?|\n/)[0] === frontMatterDelimitter) {
    let split = str.split(frontMatterDelimitter)

    if(split.length > 2) {
      let frontMatter = split[1], markdown = split[2]

      return {
        frontMatter,
        markdown
      }
    }
  }

  return {
    markdown: str
  }
}

module.exports = function md(str) {
  const { markdown, frontMatter } = extract(str)
  const html = marked(markdown)

  if(markdown && frontMatter) {
    let obj = yaml(frontMatter)
    obj['__content'] = html
    return obj
  }

  return html
}