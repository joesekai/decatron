/* eslint-disable no-console */
const { Game } = require('@gathertown/gather-game-client');
const { isEmpty, entries } = require('lodash');
const { API_KEY, SPACE_ID } = require('./config');
const { BOT_NAME, BOT_INFO } = require('./constants');
const { teleport } = require('./utils');

global.WebSocket = require('isomorphic-ws');

const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: API_KEY }));
game.connect();
game.subscribeToConnection((connected) => console.log('connected to server?', connected));

game.subscribeToEvent('playerChats', (data, context) => {
  const message = data.playerChats;

  if (!message.contents.startsWith('/')) {
    return;
  }

  if (message.recipient === 'GLOBAL_CHAT') {
    switch (message.contents.toLocaleLowerCase()) {
      case '/join': {
        const isBotActive = !isEmpty(
          game.filterPlayersInSpace((player) => player.name === BOT_NAME)
        );

        if (!isBotActive) {
          game.enter(BOT_INFO);
          setTimeout(() => teleport(game, BOT_NAME, context.player.name), 1000);

          game.chat('GLOBAL_CHAT', [], context.player.map, {
            contents: `Hey it's me - ${BOT_NAME}! How can I help you?`,
          });
          return;
        }

        game.chat('GLOBAL_CHAT', [], context.player.map, {
          contents: `${BOT_NAME} has already joined the space. Kindly use the teleport command to teleport to ${BOT_NAME}`,
        });

        break;
      }
      case '/leave': {
        game.chat('GLOBAL_CHAT', [], context.player.map, {
          contents: `It was nice to meet you! Toodles!`,
        });
        game.exit();
        break;
      }
      default: {
        game.chat('GLOBAL_CHAT', [], context.player.map, {
          contents: `Kindly send this command directly to ${BOT_NAME} via Direct Message`,
        });
        break;
      }
    }
  } else if (message.messageType === 'DM') {
    const [command, ...flags] = message.contents.split(' ');

    switch (command) {
      case '/leave': {
        game.exit();
        break;
      }
      case '/teleport': {
        if (!flags.length) {
          game.chat('LOCAL_CHAT', [`${message.senderId}`], 'office-outdoor', {
            contents: `Invalid command! Kindly use the proper syntax:\n\n /teleport <player> <map | player>`,
          });

          return;
        }

        const playerName = flags[0];
        const destination = flags[1];

        if (!playerName || !destination) {
          game.chat('LOCAL_CHAT', [`${message.senderId}`], 'office-outdoor', {
            contents: `Invalid command! Kindly use the proper syntax:\n\n /teleport <player> <map | player>`,
          });

          return;
        }

        teleport(game, playerName, destination);

        break;
      }
      case '/showPlayers': {
        const playersList = game.players;
        const playersInSpace = entries(playersList)
          .map(([, playerInfo], index) => {
            return `${index + 1}. ${playerInfo.name}`;
          })
          .join('\n');

        game.chat('LOCAL_CHAT', [`${message.senderId}`], 'office-outdoor', {
          contents: `List of Members:\n\n ${playersInSpace}`,
        });

        break;
      }
      default: {
        game.notify('Invalid Command');
      }
    }
  }
});
