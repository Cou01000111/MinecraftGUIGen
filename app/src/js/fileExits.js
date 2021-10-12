const gp = require("./getFilePath");
const fs = require("fs");

// 加工可能なリソースパックか
function isConvertibleResourcePack(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  return (
    isResourcePack(resourcePackPath) &&
    (isWidgetsbaseExists(resourcePackPath) || isWidgetsExists(resourcePackPath))
  );
}
// リソースパックにwidgets.pngがあるか
function isWidgetsExists(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  return fs.existsSync(gp.getWidgetsPath(resourcePackPath));
}
// リソースパックにwidgetsBase.pngがあるか
function isWidgetsbaseExists(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  return fs.existsSync(gp.getWidgetsBasePath(resourcePackPath));
}
// リソースパックにwidgetsChars.pngがあるか
function isWidgetsCharsExists(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  return fs.existsSync(gp.getWidgetsCharsPath(resourcePackPath));
}
// リソースパックにchars.jsonがあるか
function isWidgetsCharsJsonExists(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  return fs.existsSync(gp.getWidgetsCharsJsonPath(resourcePackPath));
}
// resource packかどうか(ディレクトリの中にmcmetaがあるかどうか)
function isResourcePack(resourcePackPath) {
  if(!resourcePackPath)console.error("arg error");
  var fs = require("fs");
  var files = fs.readdirSync(resourcePackPath);
  var ans = false;
  files.forEach((file) => {
    //console.log(file);
    if (file.split(".")[1] == "mcmeta") {
      ans = true;
    }
  });
  //console.log(`ans:${ans}`);
  return ans;
}

module.exports = {
  isConvertibleResourcePack,
  isWidgetsExists,
  isWidgetsCharsExists,
  isWidgetsCharsJsonExists,
  isWidgetsbaseExists,
  isResourcePack,
};
