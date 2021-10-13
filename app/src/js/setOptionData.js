const ew = require('./errorWarning');
const fs = require('fs');
const $ = require('jquery');
const gjd = require('./getJsonData');
const util = require('./util');
module.exports = { setOptionData };

function setOptionData(path) {
  if (fs.existsSync(path)) {
    $('#gameOptionInput').val(path);
    setOptionDataMain();
  } else {
    ew.gameDirNotFound();
  }
}

// option data table 関係を設定する
function setOptionDataMain() {
  // optionから改行区切りで配列にしたものをlineDataListに格納
  var options = new Map();
  var text = fs.readFileSync(getOptionPath()).toString();
  var lineDataList = text.split(util.getLFCode(text));
  var version;
  lineDataList.forEach((text) => {
    // version取得&描画
    if (text.toString().split(':')[0] == 'version') {
      version = getMinecraftVersionString(text.toString().split(':')[1]);
      setMinecraftVersion();
      console.log(version);
      if (version == 'none') {
        //console.log(version);
        ew.selectedOutOfSupportVersion();
      }
    }
    if (
      text
        .toString()
        .split(':')[0]
        .match(/key_key\.hotbar.*/g) /*|| text.toString().split(":")[0].match(/key_key.swapOffhand/g)*/
    ) {
      options.set(text.toString().split(':')[0], text.toString().split(':')[1]);
    }
  });
  setKeyConfig(options, version);
}

//codeからminecraftのversionを返す(参照:https://minecraft.fandom.com/wiki/Data_version)
function getMinecraftVersionString(code) {
  console.log(code);
  //1.13以降
  if (code >= 1519) {
    return '1.13';
    //1.12.2以前
  } else if (code <= 1343) {
    return '1.12.2';
  } else {
    return 'none';
  }
}

// 渡されたリソースパックのパスをもとにoptions.txtを返す
function getOptionPath() {
  if ($('#gameOptionInput').val()) {
    return $('#gameOptionInput').val();
  } else {
    throw Error();
  }
}

function setMinecraftVersion(version) {
  var setText;
  if (version == '1.13') {
    setText = '1.13以降';
  } else if (version == '1.12.2') {
    setText = '1.12.2以前';
  } else {
    setText = version;
  }
  $('#minecraftVersion').text(setText);
}

// options{"keyConfig":"value"}をもとに'#minecraftKeyConfig'をいれる
function setKeyConfig(options, version) {
  var array = new Array();
  options.forEach((element) => {
    array.push(element);
  });
  //console.log(toStringFromKeyConfig(options,'1.16.5'));
  $('#minecraftKeyConfig').text(toStringFromKeyConfig(options, version));
}

//optionsを変換して返す
function toStringFromKeyConfig(options, version) {
  var stringArr = new Array();
  var keycode;
  if (version == '1.13') {
    keycode = gjd.getKeyCode1_13();
    options.forEach((option) => {
      console.log(option);
      stringArr.push(keycode[option]);
    });
  } else if (version == '1.12.2') {
    keycode = gjd.getKeyCode1_12_2();
    options.forEach((option) => {
      console.log(option);
      stringArr.push(keycode[option]);
    });
  } else {
    ew.selectedOutOfSupportVersion();
  }
  return stringArr.join(',');
}
