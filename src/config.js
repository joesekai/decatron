require('dotenv').config();

module.exports = {
  API_KEY: process.env.GATHER_TOWN_API_KEY,
  SPACE_ID: process.env.GATHER_TOWN_SPACE_ID,
  PORT: process.env.PORT,
  YOUTUBE_PROXY_URL: process.env.YOUTUBE_PROXY_URL,
  COMMAND_PREFIX: '!',
};
