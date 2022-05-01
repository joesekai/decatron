const { sendChat } = require('../../utils');

module.exports = {
  name: 'stop',
  description: `Stops playing music`,
  args: false,
  botCommand: true,
  usage: '',
  execute({ game, recipient, context, args }) {
    game.stopSound();
    sendChat({ game, recipient, context, message: 'Stopping music' });
  },
};
