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

function teleportAll(game, destination) {
  const $destination = toUpper(destination);

  let destinationInfo;
  if (keys(LOCATIONS).includes($destination)) {
    destinationInfo = LOCATIONS[$destination];
  } else {
    destinationInfo = getPlayerInfo(game, destination);
  }

  if (!destinationInfo) {
    throw new Error('Destination not found');
  }

  entries(game.players).forEach(([id]) => {
    game.teleport(destinationInfo.map, destinationInfo.x + 1, destinationInfo.y + 1, id);
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
  teleportAll,
  getPlayerId,
  getPlayerInfo,
  sendChat,
};
