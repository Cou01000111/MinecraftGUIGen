const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
const locals = {/* ...*/ }
const setupPug = require('electron-pug');
const log = require('electron-log');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const packageJson = require('../package.json');
let mainWindow;

//自動更新はhttps://github.com/iffy/electron-updater-example を参照

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let template = []
if (process.platform === 'darwin') {
    // OS X
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about'
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() { app.quit(); }
            },
        ]
    })
}

autoUpdater.on('update-downloaded', ({ version, files, path, sha512, releaseName, releaseNotes, releaseDate }) => {
    const detail = `${app.getName()} ${version} ${releaseDate}`

    dialog.showMessageBox(
        win, // new BrowserWindow
        {
            type: 'question',
            buttons: ['再起動', 'あとで'],
            defaultId: 0,
            cancelId: 999,
            message: '新しいバージョンをダウンロードしました。再起動しますか？',
            detail
        },
        res => {
            if (res === 0) {
                autoUpdater.quitAndInstall()
            }
        }
    )
});

async function createWindow() {
    try {
        let pug = await setupPug({ pretty: true }, locals)
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
    mainWindow = new BrowserWindow({
        width: 800,
        height: 900,
        center: true,
        icon: path.join(__dirname, './img/icon.ico'),
        webPreferences: {
            preload: `${__dirname}/preload.js`,    // preloadを追加
            enableRemoteModule: true,               // warning対策
            nodeIntegration: true,
            devTools: true
        },
    });

    mainWindow.loadURL("file://" + __dirname + "/index.pug");

    // 開発ツールを有効化
    //mainWindow.webContents.openDevTools();
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }

    Menu.setApplicationMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.setMenu(null)
    mainWindow.setResizable(false);
}

app.on('ready', () => {
    autoUpdater.checkForUpdatesAndNotify();
    createWindow();
});

ipcMain.on('open-resourcepack-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: app.getPath('appData')
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-directory', result.filePaths[0])
        }
    })
});

ipcMain.on('open-base-dialog', (event, dp) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-base-path', result.filePaths[0])
        }
    })
});

ipcMain.on('open-chars-dialog', (event, dp) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-chars-path', result.filePaths[0])
        }
    })
});

ipcMain.on('open-chars-json-dialog', (event, dp) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Custom File Type', extensions: ['json'] }],
        properties: ['openFile'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-chars-json-path', result.filePaths[0])
        }
    })
});

ipcMain.on('open-output-dialog', (event, dp) => {
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-output-path', result.filePaths[0])
        }
    })
});

ipcMain.on('selected-game-directory', (event, dp) => {

    dialog.showOpenDialog({
        properties: ['openFile'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-game-directory', result.filePaths[0])
        }
    })
});

ipcMain.on('setup-option-directory', (event, dp) => {
    const fs = require('fs');
    dialog.showOpenDialog({
        properties: ['openDirectory'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('set-up-option', result.filePaths[0])
        }
    })
});

ipcMain.on('setup-option-file', (event, dp) => {
    const fs = require('fs');
    dialog.showOpenDialog({
        properties: ['openFile'],
        defaultPath: dp
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('set-up-option', result.filePaths[0])
        }
    })
});
