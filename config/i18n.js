const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'ua'],
  defaultLocale: 'en',
  cookie: 'lang',
  updateFiles: false,
  autoReload: true,
  directory: path.join(__dirname, '../locales'),
  objectNotation: true
});

module.exports = i18n;
