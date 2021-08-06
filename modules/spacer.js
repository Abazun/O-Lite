module.exports = function removeSpaces(s) {
  return s !== undefined ? s.replace(/\s/g, '') : '';
};
