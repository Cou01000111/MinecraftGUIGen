const { remote, ipcRenderer } = require('electron');
const $ = require('jquery');
const fs = require('fs');
const { error } = require('jquery');
const lf = require('linefeed');
const app = remote.app;

const WIDGETS_CHARA_PATH = '..\\img\\widgetsChars.png';
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
    setWidgetCharsPath();
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

function setWidgetCharsPath() {
    // widgetChars exits
    if (isWidgetsCharsExists()) {
        $('#widgetsCharsPathInput').val(getWidgetsCharsPath());
    } else {
        $('#charsWarning').text($('#charsWarning').text() + 'widgetsChars.pngが見つかりませんでした。App付属のwidgetsChars.pngを使用します')
        $('#widgetsCharsPathInput').val(WIDGETS_CHARA_PATH);
    }
}

function setOutputPath() {
    if ($('#overwriteWidgets').prop('checked')) {
        setOutputPathOverwrite();
    } else {
        setOutputPathDoNotOverwrite();
    }
}

function setOutputPathDoNotOverwrite() {
    $('#outputPathInput').val(getOutputDirPath() + 'widgetsOutput.png');
}

function setOutputPathOverwrite() {
    $('#outputPathInput').val(getOutputDirPath() + 'widgets.png');
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
        setOptionData();
    } else {
        gameDirNotFound();
    }
}

function gameDirNotFound() {
    $('#gameOptionError')
        .text('ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください');
}

// option data table 関係を設定する
function setOptionData() {
    // optionから改行区切りで配列にしたものをlineDataListに格納
    var options = new Map();
    var text = fs.readFileSync(getOptionPath()).toString();
    console.log(typeof text);
    var lineDataList = new Array(text.split(lf.getLFCode(text)));
    lineDataList.forEach((text) => {
        console.log(text.);
        options.set(text.split(":")[0], text.split(":")[1]);
    });
    console.log(options);
}

// 渡されたgame directoryのパスをもとにoptions.txtを返す
function getOptionPath(path) {
    console.log(`${path}\\options.txt`);
    return `${path}\\options.txt`;
}

// 渡されたリソースパックのパスをもとにoptions.txtを返す
function getOptionPath() {
    if ($('#gameOptionInput').val()) {
        return `${$('#gameOptionInput').val()}\\options.txt`;
    }
    else {
        throw error();
    }
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
// リソースパックにwidgetsChars.pngがあるか
function isWidgetsCharsExists() {
    return fs.existsSync(getWidgetsCharsPath());
}
// get path to widgetsBase.png
function getWidgetsPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgets.png');
}
// get path to widgetsBase.png
function getWidgetsBasePath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgetsBase.png');
}
// get path to widgetsChars.png
function getWidgetsCharsPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\widgetsChars.png');
}
//get path to output directory
function getOutputDirPath() {
    return (RESOURCE_PACK_PATH + '\\assets\\minecraft\\textures\\gui\\');
}

function resetError() {
    $('#errorMessage').text('');
    $('#baseError').text('');
    $('#charsError').text('');
    $('#outputError').text('');
    $('#gameOptionError').text('');
}

function resetWarning() {
    $('#warningMessage').text('');
    $('#baseWarning').text('');
    $('#charsWarning').text('');
    $('#outputWarning').text('');
    $('#gameOptionWarning').text('');
}

function resetOverwriteCheck() {
    $('#overwriteWidgets').attr('disabled', 'disabled')
}
