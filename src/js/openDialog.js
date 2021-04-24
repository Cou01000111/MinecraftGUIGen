const path = require('path');
$('#widgetsBaseDialog').on('click', () => {
    resetBaseDialog();
    ipcRenderer.send('open-base-dialog');
});
ipcRenderer.on('selected-base-path', async (event, path) => {
    $('#widgetsBasePathInput').val(path);
});
function resetBaseDialog() {
    $('#baseWarning').text('');
    $('#baseError').text('');
}

$('#widgetsCharsDialog').on('click', () => {
    resetCharDialog();
    ipcRenderer.send('open-chars-dialog');
});
ipcRenderer.on('selected-chars-path', async (event, path) => {
    $('#widgetsCharsPathInput').val(path);
});
function resetCharDialog() {
    $('#charWarning').text('');
    $('#charError').text('');
}

$('#outputDialog').on('click', () => {
    resetOutputPathDialog();
    ipcRenderer.send('open-output-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#outputPathInput').val(path);
});
function resetOutputPathDialog() {
    $('#outputWarning').text('');
    $('#outputError').text('');
}


$('#gameOptionDialogDirectory').on('click', () => {
    var dirPath = gameOptionDialog();
    ipcRenderer.send('setup-option-directory', dirPath);
});
$('#gameOptionDialogFile').on('click', () => {
    var dirPath = gameOptionDialog();
    ipcRenderer.send('setup-option-file', dirPath);
});
ipcRenderer.on('set-up-option', async (event, p) => {
    //選択されたものがdirectoryの場合=>game directoryとして処理
    //選択されたものがfileの場合=>option.txtとして処理
    fs.stat(p, function (err, stats) {
        console.log(p);
        console.log(path.extname(p));
        if (path.extname(p) == '.txt') {
            setOptionDataPreprocess(p);
        } else if (stats.isDirectory()) {
            setOptionDataPreprocess(getOptionPathByArg(p));
        } else {
            nonGameDirectoryHasBeenSelected();
        }
    });

});
function gameOptionDialog() {
    resetGameOptionDialog();
    var dirPath;
    if ($("#widgetsBasePathInput").val()) {
        dirPath = getDirName($("#widgetsBasePathInput").val(), 5)
    } else {
        dirPath = `${app.getPath('appData')}\\.minecraft\\resourcepacks`;
    }
    console.log(dirPath);
    if (fs.existsSync(dirPath)) {
        dirPath = ''
    }
    return dirPath;
}
function resetGameOptionDialog() {
    $('#gameOptionWarning').text('');
    $('#gameOptionError').text('');
}


function optionsExists(path) {
    const fs = require('fs');
    return (fs.existsSync(path + "\\options.txt"));
}


// 渡されたpathのnum個上のまでのパスを返す
function getDirName(p, num) {
    var returnPath = p;
    for (let i = 0; i < num; i++) {
        returnPath = path.dirname(returnPath);
    }
    return returnPath
}
