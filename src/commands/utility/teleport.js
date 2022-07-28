const { toLower } = require('lodash');
const { teleport, sendChat, teleportAll } = require('../../utils');

module.exports = {
  name: 'teleport',
  description: `Teleports players to the desired location`,
  args: true,
  usage: '<player> <map | player>',
  execute({ game, recipient, context, args }) {
    let playerName = context.player.name;
    let destination = args[0];

    if (args.length > 1) {
      [playerName, destination] = args;
    }
    const shouldTeleportAll = toLower(playerName) === 'all';

    if (shouldTeleportAll) {
      teleportAll(game, destination);
    } else {
      teleport(game, playerName, destination);
    }

    sendChat({
      game,
      recipient,
      context,
      message: shouldTeleportAll
        ? `Everyone was teleported to ${destination}`
        : `${playerName} was teleported to ${destination}`,
    });
  },
};
