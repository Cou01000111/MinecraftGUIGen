'use strict';
const { remote } = require('electron');
const app = remote.app;
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

$('#overwriteWidgets').change(() => {
    setOutputPath();
});

$('#gameOptionDialog').on('click', () => {
    ipcRenderer.send('selected-game-directory');
});
ipcRenderer.on('selected-game-directory', async (event, path) => {
    $('#gameOptionInput').val(path);
});

$('#overwriteWidgets').change(() => {
    setOutputPath();
});



function setWidgetBasePath() {
    // widgetBase exits
    if (isWidgetsExists()) {
        console.log('widgets発見');
        $('#overwriteWidgets').removeAttr("disabled");
    }
    if (isWidgetsbaseExists()) {
        $('#widgetsBasePathInput').val(getWidgetsBasePath());
    } else {
        $('#baseWarning').text($('#baseWarning').text() + 'widgetsBase.pngが見つかりませんでした。widgets.pngを代わりに使用します')
        $('#widgetsBasePathInput').val(getWidgetsPath());
    }
}

function setWidgetCharaPath() {
    // widgetChara exits
    if (isWidgetsCharaExists()) {
        $('#widgetsCharaPathInput').val(getWidgetsCharaPath());
    } else {
        $('#charaWarning').text($('#charaWarning').text() + 'widgetsChara.pngが見つかりませんでした。App付属のwidgetsChara.pngを使用します')
        $('#widgetsCharaPathInput').val(WIDGETS_CHARA_PATH);
    }
}

function setOutputPathDoNotOverwrite() {
    $('#outputPathInput').val(getOutputDirPath() + 'widgetsOutput.png');
}

function setOutputPathOverwrite() {
    $('#outputPathInput').val(getOutputDirPath() + 'widgets.png');
}

function setOutputPath() {
    if ($('#overwriteWidgets').prop('checked')) {
        setOutputPathOverwrite();
    } else {
        setOutputPathDoNotOverwrite();
    }
}

function setGameDirectoryPath() {
    var resPack = app.getPath('appData') + '\\.minecraft';
    if (fs.existsSync(getOptionPath(resPack))) {
        $('#gameOptionInput').val(getOptionPath(resPack));
    } else {
        $('#gameOptionError').text('ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoption.txtを指定してください');
    }
}

function getOptionPath(path) {
    console.log(`${path}\\options.txt`);
    return `${path}\\options.txt`;
}
