var { app, ipcMain, dialog } = require('electron');

module.exports = () => {
  ipcMain.on('open-resourcepack-dialog', (event) => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: app.getPath('appData'),
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-directory', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('open-base-dialog', (event, dp) => {
    dialog
      .showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-base-path', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('open-chars-dialog', (event, dp) => {
    dialog
      .showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-chars-path', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('open-chars-json-dialog', (event, dp) => {
    dialog
      .showOpenDialog({
        filters: [{ name: 'Custom File Type', extensions: ['json'] }],
        properties: ['openFile'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-chars-json-path', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('open-output-dialog', (event, dp) => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-output-path', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('selected-game-directory', (event, dp) => {
    dialog
      .showOpenDialog({
        properties: ['openFile'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('selected-game-directory', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('setup-option-directory', (event, dp) => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('set-up-option', result.filePaths[0]);
        }
      });
  });

  ipcMain.on('setup-option-file', (event, dp) => {
    dialog
      .showOpenDialog({
        properties: ['openFile'],
        defaultPath: dp,
      })
      .then((result) => {
        if (result.canceled == false) {
          event.sender.send('set-up-option', result.filePaths[0]);
        }
      });
  });
};
