const store = require('store');

const { sendChat } = require('../../utils');

module.exports = {
  name: 'stop',
  description: `Stops playing music`,
  args: false,
  botCommand: true,
  usage: '',
  execute({ game, recipient, context, args }) {
    const musicObject = store.get('musicObject');

    game.setObject(context.player.map, musicObject.id, {
      sound: {
        src: musicObject.src,
        volume: 0.0, // 0.0 to 1.0
        maxDistance: 30, // range in tiles you can hear it from
        loop: false, // if false, will play once when people enter the map, even if out of range
      },
    });

    sendChat({ game, recipient, context, message: 'Stopping music' });
  },
};
