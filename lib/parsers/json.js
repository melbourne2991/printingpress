module.exports = function json(str) {
  let result = ''
  try {
    result = JSON.parse(str)
  } catch (err) {}
  return result
}