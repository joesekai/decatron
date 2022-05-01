const { BOT_INFO } = require('../../constants');
const { sendChat } = require('../../utils');

module.exports = {
  name: 'leave',
  description: `Makes ${BOT_INFO.name} leave the space`,
  args: false,
  botCommand: true,
  usage: '',
  execute({ game, recipient, context, args }) {
    sendChat({ game, recipient, context, message: 'Aight, Imma head out!' });
    game.exit();
  },
};
