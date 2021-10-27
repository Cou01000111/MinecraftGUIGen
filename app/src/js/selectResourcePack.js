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
    if (checkIsConvertibleResourcePack(resourcePackPath)) selectedResourcePack(resourcePackPath);
    else console.log('加工不可なresource pack が選択されました');
  });
  $('#overwriteWidgets').on('change', () => {
    sop.setOutputPath(resourcePackPath);
  });
};

// 加工可能なリソースパックか
function checkIsConvertibleResourcePack(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  var ans = true;
  if (!fe.isResourcePack(resourcePackPath)) {
    ew.nonResourcePackHasBeenSelected();
    ans = false;
  }
  if (!(fe.isWidgetsbaseExists(resourcePackPath) || fe.isWidgetsExists(resourcePackPath))) {
    console.log(fe.isWidgetsbaseExists(resourcePackPath), fe.isWidgetsExists(resourcePackPath));
    ew.widgetsDoesNotFound();
    ans = false;
  }
  return ans;
}
