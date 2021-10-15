const ew = require('./errorWarning');
const sop = require('./setOutputPath');
const $ = require('jquery');
const util = require('./util');
const setOptionData = require('./setOptionData');
const fs = require('fs');
const fe = require('./fileExits');
const gp = require('./getFilePath');
const { app } = require('electron');

//リソースパックが選択された時に実行する関数
function resourcePackSelectedInProcess(resourcePackPath) {
  $('#overwriteWidgets').removeAttr('disabled');
  resetOverwriteCheck();
  ew.resetError();
  ew.resetWarning();
  resetPackPng();
  ew.resetConvertMessage();
  console.log('加工可能なresource pack が選択されました');
  setPackPng(resourcePackPath);
  setWidgetBasePath(resourcePackPath);
  setWidgetCharsPath(resourcePackPath);
  setWidgetCharsJsonPath(resourcePackPath);
  // overwrite widgets.png のチェック
  if (fs.existsSync(gp.getOutputDirPath(resourcePackPath) + 'widgets.png'))
    sop.setOutputPathOverwrite(resourcePackPath);
  else sop.setOutputPath(resourcePackPath);
  // game directory input の設定
  setOptionPath(resourcePackPath);
}
function resetOverwriteCheck() {
  //$('#overwriteWidgets').attr('disabled', 'disabled');
}
function setPackPng(resourcePackPath) {
  if (fs.existsSync(resourcePackPath + '/pack.png')) {
    $('#packPng').attr('src', resourcePackPath + '/pack.png');
  } else {
    $('#packPng').attr('src', './img/pack.png');
  }
}
function setWidgetBasePath(resourcePackPath) {
  // widgetBase exits
  if (fe.isWidgetsExists(resourcePackPath)) {
    console.log('widgetsを認識');
    $('#overwriteWidgets').removeAttr('disabled');
  }
  if (fe.isWidgetsbaseExists(resourcePackPath)) {
    $('#widgetsBasePathInput').val(gp.getWidgetsBasePath(resourcePackPath));
  } else {
    $('#baseWarning').text(
      $('#baseWarning').text() + 'widgetsBase.pngが見つかりませんでした。widgets.pngを代わりに使用します'
    );
    $('#widgetsBasePathInput').val(gp.getWidgetsPath(resourcePackPath));
  }
}
function setWidgetCharsPath(resourcePackPath) {
  // widgetChars exits
  if (fe.isWidgetsCharsExists(resourcePackPath)) {
    $('#widgetsCharsPathInput').val(gp.getWidgetsCharsPath(resourcePackPath));
  } else {
    $('#charsWarning').text(
      $('#charsWarning').text() + 'widgetsChars.pngが見つかりませんでした。App付属のwidgetsChars.pngを使用します'
    );
    $('#widgetsCharsPathInput').val('default_widgetsChars.png');
  }
}
function setWidgetCharsJsonPath(resourcePackPath) {
  // widgetCharsJson exits
  if (fe.isWidgetsCharsJsonExists(resourcePackPath)) {
    $('#widgetsCharsJsonPathInput').val(gp.getWidgetsCharsJsonPath(resourcePackPath));
  } else {
    $('#charsJsonWarning').text(
      $('#charsJsonWarning').text() + 'chars.jsonが見つかりませんでした。App付属のchars.jsonを使用します'
    );
    $('#widgetsCharsJsonPathInput').val('default_widgetsChars.json');
  }
}
function setOptionPath(resourcePackPath) {
  var gameDirPath;
  if (resourcePackPath && fs.existsSync(util.getDirName(resourcePackPath, 2)))
    gameDirPath = util.getDirName(resourcePackPath, 2);
  else gameDirPath = app.getPath('appData') + '/.minecraft';
  setOptionData.setOptionData(util.getOptionPathByArg(gameDirPath), resourcePackPath);
}

function resetPackPng() {
  $('#packPng').attr('src', './img/pack.png');
}

module.exports = resourcePackSelectedInProcess;
