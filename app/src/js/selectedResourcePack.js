const ew = require("./errorWarning");
const setOutputPath = require("./setOutputPath");
const $ = require("jquery");

function resourcePackSelectedInProcess(resourcePackPath) {
  //logのリセット
  resetOverwriteCheck();
  ew.resetError();
  ew.resetWarning();
  resetPackPng();
  ew.resetConvertMessage();
  console.log("加工可能なresource pack が選択されました");
  // pack.pngの設定
  setPackPng(resourcePackPath);
  setWidgetBasePath();
  setWidgetCharsPath();
  setWidgetCharsJsonPath();
  // overwrite widgets.png のチェック
  setOutputPath();
  // game directory input の設定
  setOptionPath(resourcePackPath);
}
function resetOverwriteCheck() {
  $("#overwriteWidgets").attr("disabled", "disabled");
}
function setPackPng(resourcePackPath) {
  if (fs.existsSync(resourcePackPath + "/pack.png")) {
    $("#packPng").attr("src", resourcePackPath + "/pack.png");
  } else {
    $("#packPng").attr("src", "./img/pack.png");
  }
}
function setWidgetBasePath() {
  // widgetBase exits
  if (isWidgetsExists()) {
    console.log("widgets発見");
    $("#overwriteWidgets").removeAttr("disabled");
  }
  if (isWidgetsbaseExists()) {
    $("#widgetsBasePathInput").val(getWidgetsBasePath());
  } else {
    $("#baseWarning").text(
      $("#baseWarning").text() +
        "widgetsBase.pngが見つかりませんでした。widgets.pngを代わりに使用します"
    );
    $("#widgetsBasePathInput").val(getWidgetsPath());
  }
}
function setWidgetCharsPath() {
  // widgetChars exits
  if (isWidgetsCharsExists()) {
    $("#widgetsCharsPathInput").val(getWidgetsCharsPath());
  } else {
    $("#charsWarning").text(
      $("#charsWarning").text() +
        "widgetsChars.pngが見つかりませんでした。App付属のwidgetsChars.pngを使用します"
    );
    $("#widgetsCharsPathInput").val("default_chars.img");
  }
}
function setWidgetCharsJsonPath() {
  // widgetCharsJson exits
  if (isWidgetsCharsJsonExists()) {
    $("#widgetsCharsJsonPathInput").val(getWidgetsCharsJsonPath());
  } else {
    $("#charsJsonWarning").text(
      $("#charsJsonWarning").text() +
        "chars.jsonが見つかりませんでした。App付属のchars.jsonを使用します"
    );
    $("#widgetsCharsJsonPathInput").val("default_chars.json");
  }
}
function setOptionPath(resourcePackPath) {
  var gameDirPath;
  if (resourcePackPath && fs.existsSync(util.getDirName(resourcePackPath, 2)))
    gameDirPath = util.getDirName(resourcePackPath, 2);
  else gameDirPath = app.getPath("appData") + "/.minecraft";
  setOptionDataPreprocess(getOptionPathByArg(gameDirPath));
}

module.exports = resourcePackSelectedInProcess;
