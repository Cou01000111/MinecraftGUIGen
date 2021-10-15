const $ = require('jquery');
const gp = require('./getFilePath');
const fs = require('fs');

module.exports = function setOutputPath(resourcePackPath) {
  if (fs.existsSync(gp.getOutputDirPath(resourcePackPath) + 'widgets.png') || $('#overwriteWidgets').prop('checked')) {
    $('#overwriteWidgets').prop('checked', true);
    setOutputPathOverwrite(resourcePackPath);
  } else {
    setOutputPathDoNotOverwrite(resourcePackPath);
  }
};
function setOutputPathDoNotOverwrite(resourcePackPath) {
  $('#outputPathInput').val(gp.getOutputDirPath(resourcePackPath) + 'widgetsOutput.png');
}
function setOutputPathOverwrite(resourcePackPath) {
  $('#outputPathInput').val(gp.getOutputDirPath(resourcePackPath) + 'widgets.png');
}
