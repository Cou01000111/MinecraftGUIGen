$('#widgetsBaseDialog').on('click', () => {
    ipcRenderer.send('open-base-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#widgetsBasePathInput').val(path);
});

$('#widgetsCharsDialog').on('click', () => {
    ipcRenderer.send('open-chars-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#widgetsCharsPathInput').val(path);
});

$('#outputDialog').on('click', () => {
    ipcRenderer.send('open-output-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#outputPathInput').val(path);
});

$('#gameOptionDialog').on('click', () => {
    ipcRenderer.send('selected-game-directory');
});
ipcRenderer.on('selected-game-directory', async (event, path) => {
    if (optionsExists(path)) {
        $('#gameOptionInput').val(path);
        setOptionData();
    } else {
        dirIsNotGameDir();
    }
});

function optionsExists(path) {
    const fs = require('fs');
    return (fs.existsSync(path + "\\options.txt"));
}

function dirIsNotGameDir(){
    $('#gameOptionError')
        .text('ゲームディレクトリを指定してください');
}
