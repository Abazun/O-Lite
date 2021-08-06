const util = require('minecraft-server-util');
const config = require("../config.json");

const server = new util.RCON(config.MINECRAFT_SERVER, { port: config.MINECRAFT_RCON1, enableSRV: true, timeout: 5000, password: config.MINECRAFT_RCON2 });

server.on('output', (message) => {
  console.log(message);
  server.close();
});

function whitelist(username) {
  return server.connect().then(() => server.run('whitelist add ' + username)) // List all players online
    .catch((error) => {
      console.log(error);
      return (404);
    });
}

function delist(username) {
  return server.connect().then(() => server.run('whitelist remove ' + username)) // List all players online
    .catch((error) => {
      console.log(error);
      return (404);
    });
}

module.exports = {
  wList: whitelist,
  dList: delist
};