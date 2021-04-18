const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
const locals = {/* ...*/ }
const setupPug = require('electron-pug')
let mainWindow;
console.log('main process');

async function createWindow() {
    try {
        let pug = await setupPug({ pretty: true }, locals)
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
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
    console.log('ren process');
});

ipcMain.on('open-file-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result) {
            event.sender.send('selected-directory', result.filePaths[0])
        }
    })
})
