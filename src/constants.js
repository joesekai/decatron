const BOT_NAME = 'Decatron (Autobot)';
const BOT_INFO = {
  name: BOT_NAME,
  avatar: 1,
  x: 15,
  y: 15,
  textStatus: 'I am not a bot',
  isNpc: true,
};

const MAPS = ['Bonfire', 'Beach', 'Shack', 'Area51', 'Cafe', 'Office', 'Arcade', 'Auditorium'];

const MAP_COORDINATES = {
  BONFIRE: {
    map: 'office-outdoor',
    x: '16',
    y: '12',
  },
  BEACH: {
    map: 'beach-bar',
    x: '8',
    y: '7',
  },
  SHACK: {
    map: 'beach-bar',
    x: '20',
    y: '34',
  },
  AREA51: {
    map: 'office-outdoor',
    x: '34',
    y: '36',
  },
  CAFE: {
    map: 'office-cozy',
    x: '42',
    y: '19',
  },
  OFFICE: {
    map: 'office-cozy',
    x: '23',
    y: '14',
  },
  ARCADE: {
    map: 'game-room',
    x: '24',
    y: '5',
  },
  AUDITORIUM: {
    map: 'conference-room',
    x: '13',
    y: '12',
  },
};

module.exports = {
  BOT_NAME,
  BOT_INFO,
  MAPS,
  MAP_COORDINATES,
};
