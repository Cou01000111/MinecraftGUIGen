'use strict';
const packageJson = require('../../package.json');
const version = packageJson.version;
const $ = require('jquery');

module.exports = function setVersion() {
  $('title').text(`Minecraft texted hotbar v${version}`);
};
