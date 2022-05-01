const { values } = require('lodash');
const store = require('store');

const { YOUTUBE_PROXY_URL } = require('../../config');
const { BOT_INFO } = require('../../constants');
const { sendChat, findDistance } = require('../../utils');

module.exports = {
  name: 'play',
  description: `Starts playing music`,
  args: true,
  botCommand: true,
  usage: '<name | url>',
  execute({ game, recipient, context, args }) {
    const name = args.join('%20');
    const mapInfo = game.partialMaps[context.player.map];
    const objectsInMap = mapInfo.objects;

    const botInfo = game.getPlayer(BOT_INFO.playerId);
    const botLocation = { x: botInfo.x, y: botInfo.y };

    const closestObjectToBot = [];
    values(objectsInMap).forEach((object) => {
      const objectLocation = { x: object.x, y: object.y };

      const distance = findDistance(botLocation, objectLocation);

      if (distance < 5) closestObjectToBot.push(object.id);
    });

    const src = `${YOUTUBE_PROXY_URL}${name}`;

    game.setObject(context.player.map, closestObjectToBot[0], {
      sound: {
        src,
        volume: 1.0, // 0.0 to 1.0
        maxDistance: 100, // range in tiles you can hear it from
        loop: false, // if false, will play once when people enter the map, even if out of range
      },
    });

    store.set('musicObject', { id: closestObjectToBot[0], src });

    sendChat({ game, recipient, context, message: `Playing music on ${closestObjectToBot[0]}` });
  },
};
