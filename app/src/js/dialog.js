const $ = require("jquery");
const path = require("path");
const ew = require("./js/errorWarning.js");
const util = require("./js/util.js");
const setOutputPath = require("./js/setOutputPath");

ipcRenderer.on("selected-base-path", async (event, path) => {
  resetBaseDialog();
  $("#widgetsBasePathInput").val(path);
});
function resetBaseDialog() {
  $("#baseWarning").text("");
  $("#baseError").text("");
}
ipcRenderer.on("selected-chars-path", async (event, path) => {
  resetCharsDialog();
  $("#widgetsCharsPathInput").val(path);
});
function resetCharsDialog() {
  $("#charsWarning").text("");
  $("#charsError").text("");
}
ipcRenderer.on("selected-chars-json-path", async (event, path) => {
  resetCharsJsonDialog();
  $("#widgetsCharsJsonPathInput").val(path);
});
function resetCharsJsonDialog() {
  $("#charsJsonWarning").text("");
  $("#charsJsonError").text("");
}
ipcRenderer.on("selected-output-path", async (event, path) => {
  resetOutputPathDialog();
  $("#outputPathInput").val(path);
});
function resetOutputPathDialog() {
  $("#outputWarning").text("");
  $("#outputError").text("");
}
ipcRenderer.on("set-up-option", async (event, p) => {
  //選択されたものがdirectoryの場合=>game directoryとして処理
  //選択されたものがfileの場合=>option.txtとして処理
  fs.stat(p, function (err, stats) {
    console.log(p);
    console.log(path.extname(p));
    if (path.extname(p) == ".txt") {
      setOptionDataPreprocess(p);
    } else if (stats.isDirectory()) {
      setOptionDataPreprocess(getOptionPathByArg(p));
    } else {
      ew.nonGameDirectoryHasBeenSelected();
    }
  });
});
module.exports= function gameOptionDialog() {
  resetGameOptionDialog();
  var dirPath;
  if ($("#widgetsBasePathInput").val()) {
    dirPath = util.getDirName($("#widgetsBasePathInput").val(), 5);
  } else {
    dirPath = `${app.getPath("appData")}\\.minecraft\\resourcepacks`;
  }
  console.log(dirPath);
  if (fs.existsSync(dirPath)) {
    dirPath = "";
  }
  return dirPath;
}
function resetGameOptionDialog() {
  $("#gameOptionWarning").text("");
  $("#gameOptionError").text("");
}
