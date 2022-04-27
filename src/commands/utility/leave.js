const { BOT_NAME } = require('../../constants');
const { getPlayerId, sendChat } = require('../../utils');

module.exports = {
  name: 'leave',
  description: `Makes ${BOT_NAME} leave the space`,
  args: false,
  usage: '',
  execute({ game, recipient, context, args }) {
    sendChat({ game, recipient, context, message: 'Aight, Imma head out!' });
    game.exit();
  },
};
