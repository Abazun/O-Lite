const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const minecraft = require('./minecraft/minecraft');
const verify = require('./modules/verification');

const doHelp = require('./modules/help');

client.on('message', function(message) {
  if (verify.isValid(message)) {
    filterCommands(message, config.COMMAND_PREFIX);
  }
});

function getCommand(message, prefix) {
  const commandBody = message.content.slice(prefix.length).split(' ');
  return commandBody.shift().toLowerCase();
}

function filterCommands(message, prefix) {
  const command = getCommand(message, prefix);
  switch(command) {
    case 'help':
      doHelp(message, config.COMMAND_PREFIX).catch(console.error);
      break;
    case 'whitelist':
      minecraft.wList(message, client, 'whitelist');
      break;
    case 'remove':
      minecraft.remove(message, 'remove');
      break;
  }
}

client.login(config.BOT_TOKEN);
