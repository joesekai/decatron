const { BOT_INFO } = require('../../constants');
const { getPlayerInfo, teleport, sendChat } = require('../../utils');

module.exports = {
  name: 'join',
  description: `Makes ${BOT_INFO.name} join the space`,
  args: false,
  botCommand: false,
  usage: '',
  execute({ game, recipient, context, args }) {
    const isBotInSpace = !!getPlayerInfo(game, BOT_INFO.name);

    if (!isBotInSpace) {
      game.enter(BOT_INFO);
      setTimeout(() => teleport(game, BOT_INFO.name, context.player.name), 1000);

      sendChat({ game, recipient, context, message: "Hey there, isn't it a beautiful day?" });

      return;
    }

    sendChat({ game, recipient, context, message: 'I have already joined the space...' });
  },
};
