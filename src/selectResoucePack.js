const { ipcRenderer } = require('electron');
const $ = require('jquery');
const fs = require('fs');
const pug = require('pug');
const widgetsBasePathInput = $('widgetsBasePathInput');
const widgetsCharaPathInput = $('widgetsCharaPathInput');
const ouputPathInput = $('ouputPathInput');

const selectDirBtn = document.getElementById('selectResoucePack');
selectDirBtn.addEventListener('click', (event) => {
    ipcRenderer.send('open-file-dialog');
    console.log('select resouce pack');
});

ipcRenderer.on('selected-directory', (event, path) => {
    //console.log(isResoucePack(path));
    if (isConvertibleResourcePack(path)) {
        console.log('加工可能なresouce pack が選択されました');
        if(isWidgetsbaseExists(path) == false){
            $('#warningMessage').text($('#warningMessage').text()+'\nwidgetsBase.pngが見つかりませんでした。widgets.pngを代わりに使用します')
        }
        if(isWidgetsCharaExists(path)){
            $('')
        }else{
            $('#warningMessage').text($('#warningMessage').text()+'\nwidgetsChara.pngが見つかりませんでした。App付属のwidgetsChara.pngを使用します')
        }
    } else {
        console.log('加工不可なresouce pack が選択されました');
        notResoucePack();
    }
});


function isResoucePack(path) {
    var fs = require('fs');
    var files = fs.readdirSync(path)
    var ans;
    files.forEach(file => {
        console.log(file);
        if (file.split('.')[1] == 'mcmeta') {
            ans = true;
        }
    });
    return ans;

}

function isConvertibleResourcePack(resoucePackPath) {
    const ans = isResoucePack(resoucePackPath);
    console.log(ans);
    return ans;
}
function isWidgetsbaseExists(resoucePackPath) {
    return fs.existsSync(resoucePackPath+'\\assets\\minecraft\\textures\\gui\\widgetsBase.png');
}
function isWidgetsCharaExists(resoucePackPath) {
    return fs.existsSync(resoucePackPath+'\\assets\\minecraft\\textures\\gui\\widgetsChara.png');
}

function notResoucePack() {
    $('#errorMessage').text('minecraftのresouce packを入れてください')
}
