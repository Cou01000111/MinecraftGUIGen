const $ = require('jquery');
function outputPathDialog() {
  $('#outputWarning').text('');
  $('#outputError').text('');
}

function charsJsonDialog() {
  $('#charsJsonWarning').text('');
  $('#charsJsonError').text('');
}

function charsDialog() {
  $('#charsWarning').text('');
  $('#charsError').text('');
}

function baseDialog() {
  $('#baseWarning').text('');
  $('#baseError').text('');
}

function gameOptionDialog() {
  $('#gameOptionWarning').text('');
  $('#gameOptionError').text('');
}

function ew() {
  $('#errorMessage').text('');
  $('#baseError').text('');
  $('#charsError').text('');
  $('#charsJsonError').text('');
  $('#outputError').text('');
  $('#gameOptionError').text('');
  $('#warningMessage').text('');
  $('#baseWarning').text('');
  $('#charsWarning').text('');
  $('#charsJsonWarning').text('');
  $('#outputWarning').text('');
  $('#gameOptionWarning').text('');
}

function convertMessage() {
  $('#convertMessage').text('');
  $('#convertError').text('');
  $('#convertWarning').text('');
}

function message() {
  $('#errorMessage').text('');
  $('#warningMessage').text('');
}

function packPng() {
  $('#packPng').attr('src', './img/pack.png');
}

module.exports = {
  outputPathDialog,
  charsJsonDialog,
  charsDialog,
  baseDialog,
  gameOptionDialog,
  ew,
  convertMessage,
  packPng,
  message,
};
