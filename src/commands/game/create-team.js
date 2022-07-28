const { entries } = require('lodash');
const store = require('store');

const { TEAM_NAMES } = require('../../constants');
const { sendChat } = require('../../utils');

module.exports = {
  name: 'create-teams',
  description: `Divides people into different teams`,
  args: true,
  usage: '<no. of teams>',
  execute({ game, recipient, context, args }) {
    const [noOfTeams] = args;
    const teamsMap = {};

    const generateTeams = () => {
      const randomNumber = Math.ceil(Math.random() * 4) - 1;

      const team = TEAM_NAMES[randomNumber];

      if (!teamsMap[team]) {
        teamsMap[team] = { name: team, players: [], score: 0 };
        return true;
      }

      return false;
    };

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < noOfTeams; i++) {
      const isTeamAdded = generateTeams();

      if (!isTeamAdded) {
        generateTeams();
      }
    }

    const teams = entries(teamsMap);
    const playerList = entries(game.players);
    const noOfPlayers = playerList.length - 1;
    const playerPerTeam = Math.ceil(noOfPlayers / noOfTeams);

    const assignTeam = (player, teamNumber) => {
      const [teamName] = teams[teamNumber];

      const playersInTeam = teamsMap[teamName].players.length;

      if (playersInTeam < playerPerTeam) {
        teamsMap[teamName].players.push(player);
        return true;
      }

      return false;
    };

    playerList.forEach(([_, player], index) => {
      const teamNumber = index > noOfTeams ? Math.floor(index / noOfTeams) : index;
      const isTeamAssigned = assignTeam(player, teamNumber);

      if (!isTeamAssigned) {
        assignTeam(player);
      }
    });

    store.set('teams', teamsMap);

    const message = teams
      .map(([teamName, teamInfo]) => {
        const players = teamInfo.players
          .map((player, index) => `[${index + 1}] ${player.name}`)
          .join('\n');
        return `Team ${teamName}: \n ${players}`;
      })
      .join('\n\n');

    sendChat({
      game,
      recipient,
      context,
      message,
    });
  },
};
