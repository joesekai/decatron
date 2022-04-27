const { entries, toUpper, keys } = require('lodash');
const { LOCATIONS } = require('./constants');

function getPlayerInfo(game, playerName) {
  const playerObj = game.filterPlayersInSpace((player) => player.name.includes(playerName));

  if (!playerObj.length) return null;

  return playerObj[0];
}

function getPlayerId(game, playerName) {
  const playersList = game.players;
  const playerInfo = entries(playersList).find(([, player]) => player.name.includes(playerName));

  return playerInfo[0];
}

function sendChat({ game, recipient, context, message }) {
  const senderId = getPlayerId(game, context.player.name);

  game.chat(recipient, [senderId], context.player.map, {
    contents: message,
  });
}

function teleport(game, playerName, destination) {
  const playerId = getPlayerId(game, playerName);
  const $destination = toUpper(destination);

  let destinationInfo;
  if (keys(LOCATIONS).includes($destination)) {
    destinationInfo = LOCATIONS[$destination];
  } else {
    destinationInfo = getPlayerInfo(game, destination);
  }

  if (destinationInfo) {
    game.teleport(destinationInfo.map, destinationInfo.x + 1, destinationInfo.y + 1, playerId);
  } else {
    throw new Error('Destination not found');
  }
}

module.exports = {
  teleport,
  getPlayerId,
  getPlayerInfo,
  sendChat,
};
