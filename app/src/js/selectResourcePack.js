const { remote, ipcRenderer } = require("electron");
const fs = require("fs");
const app = remote.app;
const setOutputPath = require("./js/setOutputPath.js");
const selectedResourcePack = require("./js/selectedResourcePack.js");

const DEFAULT_WIDGETS_CHARA_PATH = "./img/widgetsChars.png";

var resourcePackPath;

ipcRenderer.on("selected-directory", async (event, path) => {
  resourcePackPath = path;
  if (isConvertibleResourcePack()) {
    selectedResourcePack(resourcePackPath);
  } else {
    console.log("加工不可なresource pack が選択されました");
    var errorCode;
    if (isResourcePack() == false) {
      errorCode = 1;
    } else if (isWidgetsbaseExists() || isWidgetsbaseExists() == false) {
      errorCode = 2;
    }
    resourcePackExceptSelectedInProcess(errorCode);
  }
});
function resetPackPng() {
  $("#packPng").attr("src", "./img/pack.png");
}
$("#overwriteWidgets").change(() => {
  setOutputPath();
});
function setOptionDataPreprocess(path) {
  if (fs.existsSync(path)) {
    $("#gameOptionInput").val(path);
    setOptionData();
  } else {
    ew.gameDirNotFound();
  }
}

// option data table 関係を設定する
function setOptionData() {
  // optionから改行区切りで配列にしたものをlineDataListに格納
  var options = new Map();
  var text = fs.readFileSync(getOptionPath()).toString();
  var lineDataList = text.split(util.getLFCode(text));
  var version;
  lineDataList.forEach((text) => {
    // version取得&描画
    if (text.toString().split(":")[0] == "version") {
      version = getMinecraftVersionString(text.toString().split(":")[1]);
      setMinecraftVersion();
      console.log(version);
      if (version == "none") {
        //console.log(version);
        ew.selectedOutOfSupportVersion();
      }
    }
    if (
      text
        .toString()
        .split(":")[0]
        .match(
          /key_key\.hotbar.*/g
        ) /*|| text.toString().split(":")[0].match(/key_key.swapOffhand/g)*/
    ) {
      options.set(text.toString().split(":")[0], text.toString().split(":")[1]);
    }
  });
  setKeyConfig(options, version);
}

//codeからminecraftのversionを返す(参照:https://minecraft.fandom.com/wiki/Data_version)
function getMinecraftVersionString(code) {
  console.log(code);
  //1.13以降
  if (code >= 1519) {
    return "1.13";
    //1.12.2以前
  } else if (code <= 1343) {
    return "1.12.2";
  } else {
    return "none";
  }
}

function setMinecraftVersion(version) {
  var setText;
  if (version == "1.13") {
    setText = "1.13以降";
  } else if (version == "1.12.2") {
    setText = "1.12.2以前";
  } else {
    setText = version;
  }
  $("#minecraftVersion").text(setText);
}

// options{"keyConfig":"value"}をもとに'#minecraftKeyConfig'をいれる
function setKeyConfig(options, version) {
  var keyConfig;
  var array = new Array();
  options.forEach((element) => {
    array.push(element);
  });
  //console.log(toStringFromKeyConfig(options,'1.16.5'));
  $("#minecraftKeyConfig").text(toStringFromKeyConfig(options, version));
}

//optionsを変換して返す
function toStringFromKeyConfig(options, version) {
  var stringArr = new Array();
  if (version == "1.13") {
    var keycode = getKeyCode1_13();
    options.forEach((option) => {
      console.log(option);
      stringArr.push(keycode[option]);
    });
  } else if (version == "1.12.2") {
    var keycode = getKeyCode1_12_2();
    options.forEach((option) => {
      console.log(option);
      stringArr.push(keycode[option]);
    });
  } else {
    ew.selectedOutOfSupportVersion();
  }
  return stringArr.join(",");
}

//keycode1.13.jsonの内容を返す
function getKeyCode1_13() {
  return require("./keycode/keycode1.13.json");
}

//keycode1.12.2.jsonの内容を返す
function getKeyCode1_12_2() {
  return require("./keycode/keycode1.12.2.json");
}

// 渡されたgame directoryのパスをもとにoptions.txtを返す
function getOptionPathByArg(path) {
  console.log(`${path}/options.txt`);
  return `${path}/options.txt`;
}

// 渡されたリソースパックのパスをもとにoptions.txtを返す
function getOptionPath() {
  if ($("#gameOptionInput").val()) {
    return $("#gameOptionInput").val();
  } else {
    throw error();
  }
}

// select resource pack でリソースパック以外が選ばれた場合の処理
function resourcePackExceptSelectedInProcess(errorCode) {
  switch (errorCode) {
    // リソースパック以外が選択された場合
    case 1:
      ew.nonResourcePackHasBeenSelected();
      break;
    // 選択されたリソースパックにwidgets.png,widgetsBase.pngがなかった場合
    case 2:
      ew.widgetsDoesNotFound();
      break;
  }
}

// resource packかどうか(ディレクトリの中にmcmetaがあるかどうか)
function isResourcePack() {
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
// 加工可能なリソースパックか
function isConvertibleResourcePack() {
  return isResourcePack() && (isWidgetsbaseExists() || isWidgetsExists());
}
// リソースパックにwidgets.pngがあるか
function isWidgetsExists() {
  return fs.existsSync(getWidgetsPath());
}
// リソースパックにwidgetsBase.pngがあるか
function isWidgetsbaseExists() {
  return fs.existsSync(getWidgetsBasePath());
}
// リソースパックにwidgetsChars.pngがあるか
function isWidgetsCharsExists() {
  return fs.existsSync(getWidgetsCharsPath());
}
// リソースパックにchars.jsonがあるか
function isWidgetsCharsJsonExists() {
  return fs.existsSync(getWidgetsCharsJsonPath());
}
// get path to widgetsBase.png
function getWidgetsPath() {
  return resourcePackPath + "/assets/minecraft/textures/gui/widgets.png";
}
// get path to widgetsBase.png
function getWidgetsBasePath() {
  return resourcePackPath + "/assets/minecraft/textures/gui/widgetsBase.png";
}
// get path to widgetsChars.png
function getWidgetsCharsPath() {
  return resourcePackPath + "/assets/minecraft/textures/gui/widgetsChars.png";
}
// get path to chars.json
function getWidgetsCharsJsonPath() {
  return resourcePackPath + "/assets/minecraft/textures/gui/chars.json";
}
//get path to output directory
function getOutputDirPath() {
  return resourcePackPath + "/assets/minecraft/textures/gui/";
}
