"use strict";
const ew = require("./errorWarning.js");
const HOTBAR_COUNT = 9;
const CHARS_STANDARD_WIDTH = 48;
const CHARS_STANDARD_HEIGHT = 48;
var UNIT_OF_CHAR_WIDTH = 6;
var UNIT_OF_CHAR_HEIGHT = 6;
const HOTBAR_WIDTH = 20;
const BASE_STANDARD_WIDTH = 256;
const BASE_STANDARD_HEIGHT = 256;
const sharp = require("sharp");
var IMAGE_MAGNIFICATION = 1;

const DEFAULT_WIDGETS_CHARA_JSON = require("../defaultChars.json");

//TODO chars.jsonにないものがkey configにあった場合の処理
/**
 * 出力
 */
module.exports = async function convertProcess(
  basePath,
  charsPath,
  charsJson,
  keyOption,
  outputPath
) {
  ew.resetConvertMessage();
  var test = await testingArgs(basePath, charsPath, charsJson, keyOption);
  console.log(`testingArgs:`, test);
  if (test == false) {
    console.log("引数に問題がありました");
    return;
  }
  console.log("引数に問題がありませんでした");
  var options = keyOption.split(",");
  //charsがデフォルトの時用にここでsharpオブジェクトを作っておく
  var imgBuf = Buffer.from(DEFAULT_CHARS_IMG, "base64");
  var charsSharpObj =
    charsPath == "default_chars.img" ? sharp(imgBuf) : sharp(charsPath);
  makeCharPng(options, charsSharpObj, charsJson);

  var base = sharp(basePath);
  //images作成
  var chars = new Array();

  for (let i = 0; i < HOTBAR_COUNT; i++) {
    var path = `./img/${i}.png`;
    var compositeObj = {
      input: path,
      top: 1 * IMAGE_MAGNIFICATION,
      left: 1 + i * HOTBAR_WIDTH * IMAGE_MAGNIFICATION,
    };
    console.log(compositeObj);
    chars.push(compositeObj);
    console.log(i);
  }
  console.log(chars);
  base.composite(chars).toFile(outputPath, (err, info) => {
    if (err) console.log(err);
    else {
      $("#convertMessage").text("ファイル出力成功");
      console.log(info);
    }
  });
};

//chars画像,base画像,key optionそれぞれ問題がないか
//問題なし:true
async function testingArgs(basePath, charsPath, charsJson, keyOption) {
  //console.log(`basePath:${basePath}`);
  //console.log(`charsPath:${charsPath}`);
  //console.log(`charsJson:${charsJson}`);
  //console.log(keyOption);
  var charsPathTest = await testingCharsPath(charsPath);
  var basePathTest = await testingBasePath(basePath);
  var jsonPathTest = testingJsonPath(charsJson);
  var keyOptionTest = keyOption.split(",").length == HOTBAR_COUNT;
  var ans = charsPathTest && basePathTest && jsonPathTest && keyOptionTest;
  return ans;
}

//chars画像が加工をする上で問題がないか
//問題なし:true
async function testingCharsPath(charsPath) {
  if (charsPath == "") {
    ew.emptyPath("chars");
  } else if (!fs.existsSync(charsPath) && charsPath != "default_chars.img") {
    ew.invalidPath("chars");
  } else {
    var imgBuf;
    var chars;
    if (charsPath == "default_chars.img") {
      imgBuf = Buffer.from(DEFAULT_CHARS_IMG, "base64");
      chars = await sharp(imgBuf);
    } else chars = await sharp(charsPath);
    const {
      format: charsFormat,
      width: charsWidth,
      height: charsHeight,
    } = await chars.metadata();
    /*
        今のところ以下の条件のみ
        - png
        - widthが32のn倍
        - heightが36のn倍
        */
    var isPng = charsFormat == "png";
    var isWidth256NTimes = charsWidth % CHARS_STANDARD_WIDTH == 0;
    var isHeight256NTimes = charsHeight % CHARS_STANDARD_HEIGHT == 0;
    var widthWithHeightSameIs = charsWidth == charsHeight;
    console.log(charsWidth);
    console.log(charsHeight);
    if (
      isPng &&
      isWidth256NTimes &&
      isHeight256NTimes &&
      widthWithHeightSameIs
    ) {
      IMAGE_MAGNIFICATION =
        IMAGE_MAGNIFICATION < charsWidth / CHARS_STANDARD_WIDTH
          ? IMAGE_MAGNIFICATION
          : charsWidth / CHARS_STANDARD_WIDTH;
      return true;
    } else {
      var conditions = [
        isPng,
        isWidth256NTimes,
        isHeight256NTimes,
        widthWithHeightSameIs,
      ];
      ew.selectedRightnessNotImage("chars", conditions);
    }
  }
  return false;
}

//base画像が加工をする上で問題がないか
//問題なし:true
async function testingBasePath(basePath) {
  if (basePath == "") {
    ew.emptyPath("base");
  } else if (!fs.existsSync(basePath)) {
    ew.invalidPath("base");
  } else {
    const base = await sharp(basePath);
    const {
      format: baseFormat,
      width: baseWidth,
      height: baseHeight,
    } = await base.metadata();
    /*
        今のところ以下の条件のみ
        - png
        - widthが256のm倍
        - heightが256のm倍
        - width = height
        */
    var isPng = baseFormat == "png";
    var isWidth256NTimes = baseWidth % BASE_STANDARD_WIDTH == 0;
    var isHeight256NTimes = baseHeight % BASE_STANDARD_HEIGHT == 0;
    var widthWithHeightSameIs = baseWidth == baseHeight;
    if (
      isPng &&
      isWidth256NTimes &&
      isHeight256NTimes &&
      widthWithHeightSameIs
    ) {
      IMAGE_MAGNIFICATION =
        IMAGE_MAGNIFICATION < baseWidth / BASE_STANDARD_WIDTH
          ? IMAGE_MAGNIFICATION
          : baseWidth / BASE_STANDARD_WIDTH;
      return true;
    } else {
      var conditions = [
        isPng,
        isWidth256NTimes,
        isHeight256NTimes,
        widthWithHeightSameIs,
      ];
      ew.selectedRightnessNotImage("base", conditions);
    }
  }
  return false;
}

//chars jsonが加工をする上で問題ないか
function testingJsonPath(jsonPath) {
  if (jsonPath == "") {
    ew.emptyPath("json");
    return false;
  }
  if (!fs.existsSync(jsonPath) && jsonPath != "default_chars.json") {
    ew.invalidPath("json");
    return false;
  }
  var json;
  if (jsonPath == "default_chars.json") return true;
  json = fs.readFileSync(jsonPath);
  if (isValidJson(json) == false) {
    ew.illegalJSONPassed();
    return false;
  } else {
    /**jsonファイルの条件
     * unitがある
     */
    var jsObj = JSON.parse(json);
    UNIT_OF_CHAR_WIDTH = jsObj.unit.width;
    UNIT_OF_CHAR_HEIGHT = jsObj.unit.height;
    var isUnitNormal = hasUnit(jsObj);
    return isUnitNormal;
  }
}

//jsonObjにunitがあり、それが正しいかどうか
function hasUnit(jsonObj) {
  if (jsonObj.hasOwnProperty("unit") == false) {
    //unitがない
    ew.noUnit();
    return false;
  } else if (
    (jsonObj.unit.hasOwnProperty("width") &&
      jsonObj.unit.hasOwnProperty("height")) == false
  ) {
    //unitのプロパティがおかしい
    ew.unitPropertyIsIllegal();
    return false;
  }
  return true;
}

//渡された文字列がjsonに変換できるかどうか
function isValidJson(value) {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
}

//hotbarにつかうchar.pngを生成し、連番でimgに保存する
function makeCharPng(keyOptionList, charsSharpObj, jsonPath) {
  console.log(keyOptionList, charsSharpObj, jsonPath);
  var extractList = getExtractList(keyOptionList, jsonPath);
  var promises = [];
  if (!fs.existsSync("img")) fs.mkdirSync("img");
  for (const [i, option] of keyOptionList.entries()) {
    console.log(option);
    var exObj = {
      top:
        extractList.get(option).top * UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
      left:
        extractList.get(option).left * UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
      width: UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
      height: UNIT_OF_CHAR_HEIGHT * IMAGE_MAGNIFICATION,
    };
    promises.push(charsSharpObj.extract(exObj).png().toFile(`./img/${i}.png`));
  }
  Promise.all(promises)
    .then(function (results) {
      console.log(results);
    })
    .catch(function () {
      console.log("error");
    });
}
//{ option: {top: n,left:n} }のリストを返す
//key option list にない場合は{ option: "" }を返す
function getExtractList(keyOptionList, jsonPath) {
  var allExtractObjList;
  if (jsonPath == "default_chars.json")
    allExtractObjList = DEFAULT_WIDGETS_CHARA_JSON;
  else allExtractObjList = JSON.parse(fs.readFileSync(jsonPath));
  console.log(allExtractObjList);
  var extract = new Map();
  keyOptionList.forEach((option) => {
    if (allExtractObjList.hasOwnProperty(option))
      extract.set(option, allExtractObjList[option]);
    else extract.set({ option: "" });
  });
  return extract;
}
