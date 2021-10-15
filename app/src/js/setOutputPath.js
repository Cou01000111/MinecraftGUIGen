const $ = require('jquery');
const gp = require('./getFilePath');

function setOutputPath(resourcePackPath) {
  if ($('#overwriteWidgets').prop('checked')) {
    $('#overwriteWidgets').checked = true;
    setOutputPathOverwrite(resourcePackPath);
  } else {
    setOutputPathDoNotOverwrite(resourcePackPath);
  }
}
function setOutputPathDoNotOverwrite(resourcePackPath) {
  $('#outputPathInput').val(gp.getOutputDirPath(resourcePackPath) + 'widgetsOutput.png');
}
function setOutputPathOverwrite(resourcePackPath) {
  $('#outputPathInput').val(gp.getOutputDirPath(resourcePackPath) + 'widgets.png');
}

module.exports = { setOutputPath, setOutputPathDoNotOverwrite, setOutputPathOverwrite };
