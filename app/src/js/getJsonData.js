//keycode1.13.jsonの内容を返す
function getKeyCode1_13() {
  return require("../keycode/keycode1.13.json");
}

//keycode1.12.2.jsonの内容を返す
function getKeyCode1_12_2() {
  return require("../keycode/keycode1.12.2.json");
}

function getSupportKeyList() {
  return require("../keycode/support_keycode.json");
}

module.exports = { getKeyCode1_12_2, getKeyCode1_13, getSupportKeyList };
