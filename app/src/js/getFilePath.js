// get path to widgetsBase.png
function getWidgetsPath(resourcePackPath) {
  return resourcePackPath + "\\assets\\minecraft\\textures\\gui\\widgets.png";
}
// get path to widgetsBase.png
function getWidgetsBasePath(resourcePackPath) {
  return resourcePackPath + "\\assets\\minecraft\\textures\\gui\\widgetsBase.png";
}
// get path to widgetsChars.png
function getWidgetsCharsPath(resourcePackPath) {
  return resourcePackPath + "\\assets\\minecraft\\textures\\gui\\widgetsChars.png";
}
// get path to chars.json
function getWidgetsCharsJsonPath(resourcePackPath) {
  return resourcePackPath + "\\assets\\minecraft\\textures\\gui\\widgetsChars.json";
}
//get path to output directory
function getOutputDirPath(resourcePackPath) {
  return resourcePackPath + "\\assets\\minecraft\\textures\\gui\\";
}

module.exports = {
  getWidgetsBasePath,
  getWidgetsPath,
  getWidgetsCharsJsonPath,
  getWidgetsCharsPath,
  getOutputDirPath,
};
