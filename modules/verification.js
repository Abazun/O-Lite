const removeSpaces = require('./spacer');
const config = require("../config.json");

function isValidCommand(message) {
  return !message.author.bot && message.content.startsWith(config.COMMAND_PREFIX);
}

module.exports = {
  isValid: isValidCommand
};

