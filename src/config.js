require('dotenv').config();

module.exports = {
  API_KEY: process.env.GATHER_TOWN_API_KEY,
  SPACE_ID: process.env.GATHER_TOWN_SPACE_ID,
  PORT: process.env.PORT,
  COMMAND_PREFIX: '!',
};
