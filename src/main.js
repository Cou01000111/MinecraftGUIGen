const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
const locals = {/* ...*/ }
const setupPug = require('electron-pug')
const imageProcess = require('../lib/imageProcess');
const sharp = require('sharp');
let mainWindow;

async function createWindow() {
    try {
        let pug = await setupPug({ pretty: true }, locals)
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
    mainWindow = new BrowserWindow({
        width: 800 + 1200,
        height: 700,
        webPreferences: {
            preload: `${__dirname}/preload.js`,    // preloadを追加
            enableRemoteModule: true,               // warning対策
            nodeIntegration: true
        },
    });

    mainWindow.loadURL("file://" + __dirname + "/index.pug");

    // 開発ツールを有効化
    mainWindow.webContents.openDevTools();

    Menu.setApplicationMenu(null);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.setMenu(null)
    mainWindow.setResizable(false);
}

app.on('ready', () => {
    createWindow();
});
ipcMain.on('open-resourcepack-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-directory', result.filePaths[0])
        }
    })
})
ipcMain.on('open-base-dialog', (event) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-base-path', result.filePaths[0])
        }
    })
})
ipcMain.on('open-chara-dialog', (event) => {
    dialog.showOpenDialog({
        filters: [{ name: 'Images', extensions: ['png'] }],
        properties: ['openFile']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-chara-path', result.filePaths[0])
        }
    })
})
ipcMain.on('open-output-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-output-path', result.filePaths[0])
        }
    })
})
ipcMain.on('selected-game-directory', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-game-directory', result.filePaths[0])
        }
    })
})
