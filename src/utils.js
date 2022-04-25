const { entries } = require('lodash');

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
  const destinationCoords = getPlayerId(game, destination, true);

  game.teleport(
    destinationCoords.map,
    destinationCoords.x + 1,
    destinationCoords.y + 1,
    playerToTeleport
  );
}

module.exports = {
  teleport,
  getPlayerId,
};
