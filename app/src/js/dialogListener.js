const util = require("./util");
const setOptionData = require("./setOptionData");
const $ = require("jquery");

module.exports = function setDialogListener() {
  ipcRenderer.on("selected-base-path", async (event, path) => {
    reset.baseDialog();
    $("#widgetsBasePathInput").val(path);
  });
  ipcRenderer.on("selected-chars-path", async (event, path) => {
    reset.charsDialog();
    $("#widgetsCharsPathInput").val(path);
  });
  ipcRenderer.on("selected-chars-json-path", async (event, path) => {
    reset.charsJsonDialog();
    $("#widgetsCharsJsonPathInput").val(path);
  });
  ipcRenderer.on("selected-output-path", async (event, path) => {
    reset.outputPathDialog();
    $("#outputPathInput").val(path);
  });
  ipcRenderer.on("set-up-option", async (event, p) => {
    //選択されたものがdirectoryの場合=>game directoryとして処理
    //選択されたものがfileの場合=>option.txtとして処理
    fs.stat(p, function (err, stats) {
      if (path.extname(p) == ".txt") {
        setOptionData.setOptionData(p, resourcePackPath);
      } else if (stats.isDirectory()) {
        setOptionData.setOptionData(
          util.getOptionPathByArg(p),
          resourcePackPath
        );
      } else {
        ew.nonGameDirectoryHasBeenSelected();
      }
    });
  });
};
