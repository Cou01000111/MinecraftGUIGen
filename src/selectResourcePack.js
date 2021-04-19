const { remote,ipcRenderer } = require('electron');
const $ = require('jquery');
const fs = require('fs');
const app = remote.app;

const WIDGETS_CHARA_PATH = '..\\img\\widgetsChara.png';
var RESOURCE_PACK_PATH;

const selectDirBtn = document.getElementById('selectResourcePack');
selectDirBtn.addEventListener('click', () => {
    ipcRenderer.send('open-resourcepack-dialog');
});

ipcRenderer.on('selected-directory', async (event, path) => {
    resetOverwriteCheck();
    resetError();
    resetWarning();
    resetPackPng();
    RESOURCE_PACK_PATH = path
    if (isConvertibleResourcePack()) {
        resourcePackSelectedInProcess();
    } else {
        console.log('加工不可なresource pack が選択されました');
        var errorCode;
        if (isResourcePack() == false) {
            errorCode = 1;
        } else if (isWidgetsbaseExists() || isWidgetsbaseExists() == false) {
            errorCode = 2;
        }
        resourcePackExceptSelectedInProcess(errorCode);
    }
});

// select resource pack でリソースパックが選ばれた場合の処理
function resourcePackSelectedInProcess() {
    console.log('加工可能なresource pack が選択されました');
    setWidgetBasePath()
    setWidgetCharaPath();
    // overwrite widgets.png のチェック
    setOutputPath();
    // game directory input の設定
    setOptionPath();
    // pack.pngの設定
    setPackPng();
}

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

function setPackPng() {
    if (fs.existsSync(RESOURCE_PACK_PATH + '\\pack.png')) {
        $('#packPng').attr('src', RESOURCE_PACK_PATH + '\\pack.png');
    } else {
        $('#packPng').attr('src', '../img/pack.png');
    }
}

function resetPackPng() {
    $('#packPng').attr('src', '../img/pack.png');
}

$('#overwriteWidgets').change(() => {
    setOutputPath();
});


function setOptionPath() {
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

// select resource pack でリソースパック以外が選ばれた場合の処理
function resourcePackExceptSelectedInProcess(errorCode) {
    switch (errorCode) {
        // リソースパック以外が選択された場合
        case 1:
            $('#errorMessage').text('minecraftのresource packを入れてください');
            break;
        // 選択されたリソースパックにwidgets.png,widgetsBase.pngがなかった場合
        case 2:
            $('#errorMessage').text('widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません');
            break;
    }
}
// resource packかどうか(ディレクトリの中にmcmetaがあるかどうか)
function isResourcePack() {
    var fs = require('fs');
    var files = fs.readdirSync(RESOURCE_PACK_PATH)
    var ans = false;
    files.forEach(file => {
        //console.log(file);
        if (file.split('.')[1] == 'mcmeta') {
            ans = true;
        }
    });
    //console.log(`ans:${ans}`);
    return ans;
}
// 加工可能なリソースパックか
function isConvertibleResourcePack() {
    return isResourcePack() && (isWidgetsbaseExists() || isWidgetsExists());
}
// リソースパックにwidgets.pngがあるか
function isWidgetsExists() {
    return fs.existsSync(getWidgetsPath());
}
// リソースパックにwidgetsBase.pngがあるか
function isWidgetsbaseExists() {
    return fs.existsSync(getWidgetsBasePath());
}
// リソースパックにwidgetsChara.pngがあるか
function isWidgetsCharaExists() {
    return fs.existsSync(getWidgetsCharaPath());
}
// get path to widgetsBase.png
function getWidgetsPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgets.png');
}
// get path to widgetsBase.png
function getWidgetsBasePath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgetsBase.png');
}
// get path to widgetsChara.png
function getWidgetsCharaPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgetsChara.png');
}
//get path to output directory
function getOutputDirPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\');
}

function resetError() {
    $('#errorMessage').text('');
    $('#baseError').text('');
    $('#charaError').text('');
}

function resetWarning() {
    $('#warningMessage').text('');
    $('#baseWarning').text('');
    $('#charaWarning').text('');
}

function resetOverwriteCheck() {
    $('#overwriteWidgets').attr('disabled', 'disabled')
}
