"use strict";
const path = require("path");
/**
 * textから改行コードを推測し返す関数
 */
function getLFCode(text) {
  if (text.indexOf("\r\n") > -1) {
    return "\r\n";
  } else if (text.indexOf("\n") > -1) {
    return "\n";
  } else if (text.indexOf("\r") > -1) {
    return "\r";
  }
}

// 渡されたpathのnum個上のまでのパスを返す
function getDirName(p, num) {
  var returnPath = p;
  for (let i = 0; i < num; i++) returnPath = path.dirname(returnPath);
  return returnPath;
}

// 渡されたgame directoryのパスをもとにoptions.txtを返す
function getOptionPathByArg(path) {
  console.log(`${path}/options.txt`);
  return `${path}/options.txt`;
}

module.exports = { getLFCode, getDirName, getOptionPathByArg };
