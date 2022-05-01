const { teleport, sendChat } = require('../../utils');

module.exports = {
  name: 'teleport',
  description: `Teleports players to the desired location`,
  args: true,
  botCommand: true,
  usage: '<player> <map | player>',
  execute({ game, recipient, context, args }) {
    let playerName = context.player.name;
    let destination = args[0];

    if (args.length > 1) {
      [playerName, destination] = args;
    }

    teleport(game, playerName, destination);

    sendChat({
      game,
      recipient,
      context,
      message: `${playerName} was teleported to ${destination}`,
    });
  },
};
