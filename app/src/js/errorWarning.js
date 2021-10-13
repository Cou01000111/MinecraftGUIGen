const $ = require('jquery');
// 何かしらのエラーを表示するときはここにある関数を通じて標示する
function selectedOutOfSupportVersion() {
  $('#gameOptionError').text('未対応のバージョンのoptionが選ばれました<br>');
}

function dirIsNotGameDir() {
  $('#gameOptionError').text('ゲームディレクトリを指定してください<br>');
}

function nonGameDirectoryHasBeenSelected() {
  $('#gameOptionError').text('minecraftのゲームディレクトリか、ゲームディレクトリにあるoptions.txtを指定して下さい');
}

function NonResourcePackHasBeenSelected() {
  $('#errorMessage').text('minecraftのresource packを入れてください<br>');
}

function widgetsDoesNotFound() {
  $('#errorMessage').text('widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません<br>');
}

function gameDirNotFound() {
  $('#gameOptionError').text(
    'ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください<br>'
  );
}

//widgetsBase.png,widgetsChars.pngが未入力な場合に呼び出されるエラー
function emptyPath(baseOrCharsOrJson) {
  if (!(baseOrCharsOrJson == 'base' || baseOrCharsOrJson == 'chars' || baseOrCharsOrJson == 'json')) {
    throw Error();
  }
  $('#convertError').append(`${baseOrCharsOrJson}のpathが入力されていません<br>`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function invalidPath(baseOrCharsOrJson) {
  if (!(baseOrCharsOrJson == 'base' || baseOrCharsOrJson == 'chars' || baseOrCharsOrJson == 'json')) {
    throw Error();
  }
  $('#convertError').append(`${baseOrCharsOrJson}のpathが無効です<br>`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function selectedRightnessNotImage(baseOrChars, conditions) {
  if (!(baseOrChars == 'base' || baseOrChars == 'chars') || !(conditions.length == 4 || conditions.length == 3)) {
    throw Error();
  }
  $('#convertError').append(`${baseOrChars}の画像が適切ではありません<br>`);
  if (!conditions[0]) {
    $('#convertError').append(`  ${baseOrChars}の画像がpngではありません<br>`);
  }
  if (!conditions[1]) {
    $('#convertError').append(`- ${baseOrChars}の横幅がデフォルトの倍数ではありません<br>`);
  }
  if (!conditions[2]) {
    $('#convertError').append(`- ${baseOrChars}の縦幅がデフォルトの倍数ではありません<br>`);
  }
  if (!conditions[3] && baseOrChars == 'base') {
    $('#convertError').append(`- ${baseOrChars}の横幅と縦幅の比が1:1ではありません<br>`);
  }
}

//chars.jsonが不正な時
function illegalJSONPassed() {
  $('#charsJsonError').text('JSONファイルの文法に誤りがあります<br>');
}

function noUnit() {
  $('#charsJsonError').text('jsonからunitが見つかりません<br>');
}

function unitPropertyIsIllegal() {
  $('#charsJsonError').text('jsonのunitのプロパティに誤りがあります<br>');
}

function unitWidthIsInvalid() {
  $('#charsJsonError').text('jsonのunit.widthの数値が1~20ではありません<br>');
}

function unitHeightIsInvalid() {
  $('#charsJsonError').text('jsonのunit.heightの数値が1~20ではありません<br>');
}

function noSupportKey() {
  $('#charsJsonError').text('jsonからsupportKeyが見つかりません<br>');
}

function supportKeyIsNotArray() {
  $('#charsJsonError').text('jsonのsupportKeyが配列ではありません<br>');
}

function supportKeyValueIsNotString() {
  $('#charsJsonError').text('jsonのsupportKeyが文字列ではありません（"または\'で囲われていません）<br>');
}

function supportKeyLengthIsZero() {
  $('#charsJsonError').text('jsonのsupportKeyのプロパティに要素がありません<br>');
}

function unsupportedKeyIsExists(key) {
  $('#charsJsonError').text(
    `jsonのsupportKeyに未対応のkey(${key} etc...)が含まれています(現在1.13以降のkeyのみに対応しています)<br>`
  );
}

function charsJsonPngMismatch() {
  $('#charsWarning').text('charsのjsonとpngが一致していない可能性があります');
  $('#charsJsonWarning').text('charsのjsonとpngが一致していない可能性があります');
}

function charsByNotSupportedKeySelected() {
  $('#convertWarning').text('このJSONでサポートされていないkeyがoptionにあったため、出力画像では空白になります');
}

function resetError() {
  $('#errorMessage').text('');
  $('#baseError').text('');
  $('#charsError').text('');
  $('#charsJsonError').text('');
  $('#outputError').text('');
  $('#gameOptionError').text('');
}

function resetWarning() {
  $('#warningMessage').text('');
  $('#baseWarning').text('');
  $('#charsWarning').text('');
  $('#charsJsonWarning').text('');
  $('#outputWarning').text('');
  $('#gameOptionWarning').text('');
}

function resetConvertMessage() {
  $('#convertMessage').text('');
  $('#convertError').text('');
  $('#convertWarning').text('');
}

module.exports = {
  selectedOutOfSupportVersion,
  dirIsNotGameDir,
  nonGameDirectoryHasBeenSelected,
  NonResourcePackHasBeenSelected,
  widgetsDoesNotFound,
  gameDirNotFound,
  emptyPath,
  invalidPath,
  selectedRightnessNotImage,
  illegalJSONPassed,
  noUnit,
  unitPropertyIsIllegal,
  resetError,
  resetWarning,
  resetConvertMessage,
  noSupportKey,
  supportKeyLengthIsZero,
  supportKeyIsNotArray,
  supportKeyValueIsNotString,
  charsJsonPngMismatch,
  unitWidthIsInvalid,
  unitHeightIsInvalid,
  unsupportedKeyIsExists,
  charsByNotSupportedKeySelected,
};
