const embedMessage = require('./embed');
const Discord = require("discord.js");

function unknownCommand(message){
  message.channel.send('Unknown Command.');
}

module.exports = async function doHelp(message, prefix) {
  const command = message.content.replace(prefix + 'help', '').replace(/\s/g, '');
  if (command.length > 1) {
    const genericString = '**`Type \'' + prefix;
    const messageEnding = '`**';
    switch (command) {
      case 'whitelist':
        message.channel.send(embedMessage(genericString + 'whitelist\' + your in-game Minecraft username. Ex: ' + prefix + 'whitelist Maztm' + messageEnding));
        break;
      case 'remove':
        message.channel.send(embedMessage(genericString + 'remove\' + your in-game Minecraft username. Ex: ' + prefix + 'remove Maztm' + messageEnding));
        break;
      default:
        unknownCommand(message);
        break;
    }
  }  else {
    const genericString = '`' + prefix + 'help ';
    const embed = new Discord.MessageEmbed()
      .setColor('#000000')
      .setAuthor('OBot Commands', 'https://i.imgur.com/O4Gcgk1.png')
      .addFields(
        {name: '**Whitelist yourself on the Minecraft Server**', value: genericString + 'whitelist`', inline: true},
        {name: '**Remove a user from the whitelist**', value: genericString + 'remove`', inline: true},
      );
    
    message.channel.send(embed);
  }
};
