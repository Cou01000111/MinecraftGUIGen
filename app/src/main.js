const { app, Menu, BrowserWindow, dialog } = require('electron');
const locals = {
  /* ...*/
};
const setupPug = require('electron-pug');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const path = require('path');
var setIpc = require('./ipc');

let mainWindow;

process.env.NODE_OPTIONS = undefined;

//自動更新はhttps://github.com/iffy/electron-updater-example を参照

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let template = [];
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() {
          app.quit();
        },
      },
    ],
  });
}

autoUpdater.on('update-downloaded', ({ version, releaseDate }) => {
  const detail = `${app.getName()} ${version} ${releaseDate}`;
  dialog
    .showMessageBox(
      //win, // new BrowserWindow
      {
        type: 'question',
        buttons: ['再起動', 'あとで'],
        defaultId: 0,
        cancelId: 999,
        message: '新しいバージョンをダウンロードしました。再起動しますか？',
        detail,
      }
    )
    .then((res) => {
      console.log(res);
      if (res.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

app.on('ready', function () {
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
app.on('window-all-closed', () => {
  app.quit();
});

//#endregion

async function createWindow() {
  try {
    let pug = await setupPug({ pretty: true }, locals);
    pug.on('error', (err) => console.error('electron-pug error', err));
  } catch (err) {
    // Could not initiate 'electron-pug'
  }
  mainWindow = new BrowserWindow({
    width: app.isPackaged ? 500 : 800,
    height: app.isPackaged ? 750 : 900,
    center: true,
    icon: path.join(__dirname, './img/icon.ico'),
    webPreferences: {
      preload: `${__dirname}/preload.js`, // preloadを追加
      enableRemoteModule: true, // warning対策
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
    },
  });
  //mainWindow.webContents.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.pug');
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
  Menu.setApplicationMenu(null);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.setMenu(null);
  mainWindow.setResizable(false);
}

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

setIpc();
