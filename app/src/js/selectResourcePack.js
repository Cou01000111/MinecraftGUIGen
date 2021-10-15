const { ipcRenderer } = require('electron');
const fe = require('./fileExits');
const sop = require('./setOutputPath.js');
const selectedResourcePack = require('./selectedResourcePack.js');
const $ = require('jquery');
const ew = require('./errorWarning');
var resourcePackPath;

module.exports = function setForSelectResourcePack() {
  ipcRenderer.on('selected-directory', async (event, path) => {
    resourcePackPath = path;
    if (fe.isConvertibleResourcePack(resourcePackPath)) {
      selectedResourcePack(resourcePackPath);
    } else {
      console.log('加工不可なresource pack が選択されました');
      var errorCode;
      if (fe.isResourcePack(resourcePackPath) == false) {
        errorCode = 1;
      } else if (fe.isWidgetsbaseExists(resourcePackPath)) errorCode = 2;
      resourcePackExceptSelectedInProcess(errorCode);
    }
  });
  $('#overwriteWidgets').on('change', () => {
    sop.setOutputPath(resourcePackPath);
  });
};

// select resource pack でリソースパック以外が選ばれた場合の処理
function resourcePackExceptSelectedInProcess(errorCode) {
  switch (errorCode) {
    // リソースパック以外が選択された場合
    case 1:
      ew.nonResourcePackHasBeenSelected();
      break;
    // 選択されたリソースパックにwidgets.png,widgetsBase.pngがなかった場合
    case 2:
      ew.widgetsDoesNotFound();
      break;
  }
}
