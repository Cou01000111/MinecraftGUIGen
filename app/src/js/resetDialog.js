const $ = require("jquery");
function outputPathDialog() {
  $("#outputWarning").text("");
  $("#outputError").text("");
}
function charsJsonDialog() {
  $("#charsJsonWarning").text("");
  $("#charsJsonError").text("");
}
function charsDialog() {
  $("#charsWarning").text("");
  $("#charsError").text("");
}
function baseDialog() {
  $("#baseWarning").text("");
  $("#baseError").text("");
}
function gameOptionDialog() {
  $("#gameOptionWarning").text("");
  $("#gameOptionError").text("");
}

module.exports = {
  outputPathDialog,
  charsJsonDialog,
  charsDialog,
  baseDialog,
  gameOptionDialog,
};
