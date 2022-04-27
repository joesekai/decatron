/**
 * @file
 *
 * A GatherTown bot with lot of smart tricks up its' pocket
 */

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const { Game } = require('@gathertown/gather-game-client');
const { entries } = require('lodash');
const express = require('express');
const fs = require('fs');

const { API_KEY, SPACE_ID, PORT, COMMAND_PREFIX } = require('./config');
const { sendChat } = require('./utils');

global.WebSocket = require('isomorphic-ws');

const app = express();

app.get('/', (req, res) => {
  res.send('I got my caffeine shot! ☕');
});

function initializeCommands() {
  const commands = new Map();

  const commandFolders = fs.readdirSync('./src/commands');

  const commandFiles = commandFolders.reduce((acc, folder) => {
    fs.readdirSync(`./src/commands/${folder}`).forEach((file) => {
      if (file.endsWith('.js')) {
        // eslint-disable-next-line no-param-reassign
        acc = { ...acc, [folder]: [...(acc[folder] || []), file] };
      }
    });

    return acc;
  }, {});

  entries(commandFiles).forEach(([folder, files]) => {
    files.forEach((file) => {
      const command = require(`./commands/${folder}/${file}`);
      commands.set(command.name, command);
    });
  });

  return commands;
}

function main() {
  const game = new Game(SPACE_ID, () => Promise.resolve({ apiKey: API_KEY }));
  game.connect();
  game.subscribeToConnection((connected) => console.log('connected to server?', connected));

  const commands = initializeCommands();

  game.subscribeToEvent('playerChats', (data, context) => {
    const message = data.playerChats;

    if (!message.contents.startsWith(COMMAND_PREFIX)) return;

    let recipient = message.messageType || message.recipient;

    // The bot cannot reply back in DM, so if the player messages the bot in DM, the bot will reply
    // back in the LOCAL_CHAT
    if (recipient === 'DM') recipient = 'LOCAL_CHAT';

    if (!context.player.isSignedIn) {
      sendChat({
        game,
        recipient,
        context,
        message: "I don't listen to people who don't sign in, pfft",
      });

      return;
    }

    const args = message.contents.substring(COMMAND_PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commands.has(commandName)) return;

    const command = commands.get(commandName);

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${context.player.name}!`;

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${COMMAND_PREFIX}${command.name} ${command.usage}\``;
      }

      sendChat({ game, recipient, context, message: reply });

      return;
    }

    try {
      command.execute({ game, recipient, context, args });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      sendChat({
        game,
        recipient,
        context,
        message: 'There was an error in executing that command',
      });
    }
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has started on port ${PORT}`);
  main();
});
