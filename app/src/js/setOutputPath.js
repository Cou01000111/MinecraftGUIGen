"use strict";
module.exports = function setOutputPath() {
  if ($("#overwriteWidgets").prop("checked")) {
    setOutputPathOverwrite();
  } else {
    setOutputPathDoNotOverwrite();
  }
};
function setOutputPathDoNotOverwrite() {
  $("#outputPathInput").val(getOutputDirPath() + "widgetsOutput.png");
}
function setOutputPathOverwrite() {
  $("#outputPathInput").val(getOutputDirPath() + "widgets.png");
}
