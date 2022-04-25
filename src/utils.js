const { entries } = require('lodash');
const { MAPS, MAP_COORDINATES } = require('./constants');

function getPlayerId(game, playerName, extractContext = false) {
  const playersList = game.players;
  const playerInfo = entries(playersList).find(([, player]) => player.name.includes(playerName));

  if (extractContext) {
    return playerInfo[1];
  }

  return playerInfo[0];
}

function teleport(game, playerName, destination) {
  const playerToTeleport = getPlayerId(game, playerName);

  let destinationLocation;
  if (MAPS.includes(destination)) {
    destinationLocation = MAP_COORDINATES[destination.toUpperCase()];
  } else {
    destinationLocation = getPlayerId(game, destination, true);
  }

  game.teleport(
    destinationLocation.map,
    destinationLocation.x + 1,
    destinationLocation.y + 1,
    playerToTeleport
  );
}

module.exports = {
  teleport,
  getPlayerId,
};
