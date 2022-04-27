const { keys, capitalize } = require('lodash');
const { LOCATIONS } = require('../../constants');
const { sendChat } = require('../../utils');

module.exports = {
  name: 'show-locations',
  description: `Shows the list of all the available locations in the space`,
  args: false,
  usage: 'x',
  execute({ game, recipient, context, args }) {
    const locationsInSpace = keys(LOCATIONS)
      .map((location, index) => `${index + 1}. ${capitalize(location)}`)
      .join('\n');

    sendChat({ game, recipient, context, message: `List of Locations:\n\n ${locationsInSpace}` });
  },
};
