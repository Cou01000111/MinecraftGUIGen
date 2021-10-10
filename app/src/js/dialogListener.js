exports.module=function setDialogListener() {
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

}
