const gp = require('./getFilePath');
const fs = require('fs');

// リソースパックにwidgets.pngがあるか
function isWidgetsExists(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  return fs.existsSync(gp.getWidgetsPath(resourcePackPath));
}

// リソースパックにwidgetsBase.pngがあるか
function isWidgetsbaseExists(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  return fs.existsSync(gp.getWidgetsBasePath(resourcePackPath));
}

// リソースパックにwidgetsChars.pngがあるか
function isWidgetsCharsExists(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  return fs.existsSync(gp.getWidgetsCharsPath(resourcePackPath));
}

// リソースパックにchars.jsonがあるか
function isWidgetsCharsJsonExists(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  return fs.existsSync(gp.getWidgetsCharsJsonPath(resourcePackPath));
}

// resource packかどうか(ディレクトリの中にmcmetaがあるかどうか)
function isResourcePack(resourcePackPath) {
  if (!resourcePackPath) console.error('arg error');
  console.log(resourcePackPath);
  var files = require('fs').readdirSync(resourcePackPath);
  return files.includes('pack.mcmeta');
}

module.exports = {
  isWidgetsExists,
  isWidgetsCharsExists,
  isWidgetsCharsJsonExists,
  isWidgetsbaseExists,
  isResourcePack,
};
