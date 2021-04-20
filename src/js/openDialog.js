$('#widgetsBaseDialog').on('click', () => {
    ipcRenderer.send('open-base-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#widgetsBasePathInput').val(path);
});

$('#widgetsCharaDialog').on('click', () => {
    ipcRenderer.send('open-chara-dialog');
});
ipcRenderer.on('selected-output-path', async (event, path) => {
    $('#widgetsCharaPathInput').val(path);
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
    $('#gameOptionInput').val(path);
});
