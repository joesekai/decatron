const { entries } = require('lodash');
const { sendChat } = require('../../utils');

module.exports = {
  name: 'show-players',
  description: `Shows the list of all the players present in the space`,
  args: false,
  usage: '',
  execute({ game, recipient, context, args }) {
    const playersList = game.players;
    const playersInSpace = entries(playersList)
      .map(([, playerInfo], index) => {
        return `${index + 1}. ${playerInfo.name}`;
      })
      .join('\n');

    sendChat({ game, recipient, context, message: `List of Players:\n\n ${playersInSpace}` });
  },
};
