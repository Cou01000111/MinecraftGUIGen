const $ = require("jquery");
const gp = require("./getFilePath");

module.exports = function setOutputPath(resourcePackPath) {
  if ($("#overwriteWidgets").prop("checked")) {
    setOutputPathOverwrite(resourcePackPath);
  } else {
    setOutputPathDoNotOverwrite(resourcePackPath);
  }
};
function setOutputPathDoNotOverwrite(resourcePackPath) {
  $("#outputPathInput").val(gp.getOutputDirPath(resourcePackPath) + "widgetsOutput.png");
}
function setOutputPathOverwrite(resourcePackPath) {
  $("#outputPathInput").val(gp.getOutputDirPath(resourcePackPath) + "widgets.png");
}
