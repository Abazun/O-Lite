const mcftServer = require('./server.js');

const fs = require('fs');
const config = require("../config.json");
const _ = require('lodash');

let whitelist;
let minecraftID;
let user;

function setUser() {
  user = whitelist.find(user => user.minecraftName === minecraftID);
}

function parseMinecraftId(message, command) {
  minecraftID = message.content.replace(config.COMMAND_PREFIX + command + ' ', '');
}

function saveQueueData() {
  fs.writeFileSync(config.WHITELIST_JSON, JSON.stringify(whitelist, null, 2));
}

function getWhietlist() {
  whitelist = JSON.parse(fs.readFileSync(config.WHITELIST_JSON));
}

function whitelistMinecraftUser(message, client, command) {
  parseMinecraftId(message, command);
  
  if (!!minecraftID && minecraftID.replace(' ', '').length > 0 && message.content !== (config.COMMAND_PREFIX + command)) {
  
    getWhietlist();
    setUser();
  
    if (!user) {
      if (mcftServer.wList(minecraftID) !== 404) {
        const userObject = {
          discordUserID: message.author.id,
          discordServerID: message.guild.id,
          minecraftName: minecraftID
        };
  
        whitelist.push(userObject);
  
        saveQueueData();
  
        message.channel.send(minecraftID + ' has been added to the server.').catch(console.error);
  
        if (message.author.id !== config.OWNER) {
          message.reply('I will send you a confirmation message shortly.\nPlease ensure that you are allowing direct messages from non-friends or you will not get my message.').catch(console.error);
        }
        notifyUser(userObject.discordUserID, client);
      } else {
        message.reply('The server is currently offline.').catch(console.error);
      }
    } else {
      message.reply('That username already exists').catch(console.error);
    }
  } else {
    message.reply('you have incorrectly typed the command. Please try again.').catch(console.error);
  }
}

function notifyUser(user, client) {
  client.users.cache.get(user).send('Congratulations! You\'ve been added to the Novanation Minecraft server!\n' +
    'You can access the server through this IP: ' + config.MINECRAFT_SERVER).catch(console.error);
}

function isSameUser(message, user) {
  return user.discordUserID === message.author.id;
}

async function removeUser(message, command) {
  getWhietlist();
  parseMinecraftId(message, command);
  setUser();

  if (!!user && isSameUser(message, user))  {
    if (mcftServer.dList(minecraftID) !== 404) {
      _.remove(whitelist, function(user) {
        return user.minecraftName === minecraftID
      });
      saveQueueData();
      message.reply(minecraftID + ' has been removed from the whitelist.').catch(console.error);
    } else {
      message.reply('The server is currently offline.').catch(console.error);
    }
  } else {
    message.reply('you have given the wrong Minecraft username. Please try again.').catch(console.error);
  }
}

module.exports = {
  wList: whitelistMinecraftUser,
  remove: removeUser,
};