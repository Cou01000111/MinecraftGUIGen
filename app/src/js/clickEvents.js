'use strict';
const convertProcess = require('./convertModules.js');
const $ = require('jquery');
const { app, ipcRenderer } = require('electron');
const fs = require('fs');
const reset = require('./resetDialog');
const util = require('./util');

module.exports = function setClickEvents() {
  $('#convertWidgets').on('click', async () => {
    console.log('click');
    await convertProcess(
      $('#widgetsBasePathInput').val(),
      $('#widgetsCharsPathInput').val(),
      $('#widgetsCharsJsonPathInput').val(),
      $('#minecraftKeyConfig').text(),
      $('#outputPathInput').val()
    );
  });
  $('#selectResourcePack').on('click', () => {
    ipcRenderer.send('open-resourcepack-dialog');
  });
  $('#widgetsBaseDialog').on('click', () => {
    ipcRenderer.send('open-base-dialog');
  });
  $('#widgetsCharsDialog').on('click', () => {
    ipcRenderer.send('open-chars-dialog');
  });
  $('#widgetsCharsJsonDialog').on('click', () => {
    ipcRenderer.send('open-chars-json-dialog');
  });
  $('#outputDialog').on('click', () => {
    ipcRenderer.send('open-output-dialog');
  });
  $('#gameOptionDialogDirectory').on('click', () => {
    var dirPath = gameOptionDialog();
    ipcRenderer.send('setup-option-directory', dirPath);
  });
  $('#gameOptionDialogFile').on('click', () => {
    var dirPath = gameOptionDialog();
    ipcRenderer.send('setup-option-file', dirPath);
  });
};

function gameOptionDialog() {
  reset.gameOptionDialog();
  var dirPath;
  if ($('#widgetsBasePathInput').val()) dirPath = util.getDirName($('#widgetsBasePathInput').val(), 5);
  else dirPath = `${app.getPath('appData')}\\.minecraft\\resourcepacks`;
  if (fs.existsSync(dirPath)) dirPath = '';
  return dirPath;
}
