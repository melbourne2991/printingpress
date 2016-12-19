const json = require('./json');
const md = require('./md');
const yaml = require('./yaml');

const parsers = {
  json,
  md,
  yaml,

  // aliases
  markdown: md,
  yml: yaml
}

module.exports = parsers;