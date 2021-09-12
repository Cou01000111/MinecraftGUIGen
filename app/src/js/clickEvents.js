"use strict";
const $ = require("jquery");
const convertProcess = require("./js/convertModules");
$("#convertWidgets").on("click", () => {
  convertProcess(
    $("#widgetsBasePathInput").val(),
    $("#widgetsCharsPathInput").val(),
    $("#widgetsCharsJsonPathInput").val(),
    $("#minecraftKeyConfig").text(),
    $("#outputPathInput").val()
  );
});
$("#widgetsBaseDialog").on("click", () => {
  ipcRenderer.send("open-base-dialog");
});
$("#widgetsCharsDialog").on("click", () => {
  ipcRenderer.send("open-chars-dialog");
});
$("#widgetsCharsJsonDialog").on("click", () => {
  ipcRenderer.send("open-chars-json-dialog");
});
$("#outputDialog").on("click", () => {
  ipcRenderer.send("open-output-dialog");
});
$("#gameOptionDialogDirectory").on("click", () => {
  var dirPath = gameOptionDialog();
  ipcRenderer.send("setup-option-directory", dirPath);
});
$("#gameOptionDialogFile").on("click", () => {
  var dirPath = gameOptionDialog();
  ipcRenderer.send("setup-option-file", dirPath);
});
