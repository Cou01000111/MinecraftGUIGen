const $ = require('jquery');
// 何かしらのエラーを表示するときはここにある関数を通じて標示する
function selectedOutOfSupportVersion() {
  $('#gameOptionError').text('未対応のバージョンのoptionが選ばれました');
}

function dirIsNotGameDir() {
  $('#gameOptionError').text('ゲームディレクトリを指定してください');
}

function nonGameDirectoryHasBeenSelected() {
  $('#gameOptionError').text('minecraftのゲームディレクトリか、ゲームディレクトリにあるoptions.txtを指定して下さい');
}

function nonResourcePackHasBeenSelected() {
  $('#errorMessage').text('minecraftのresource packを選択してください');
}

function widgetsDoesNotFound() {
  $('#errorMessage').text('widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません');
}

function gameDirNotFound() {
  $('#gameOptionError').text(
    'ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください'
  );
}

function duplicatedBasePathAndOutputPath() {
  $('#gameOptionError').text('今現在widgets.pngからwidgets.pngを出力することはできません');
}

//widgetsBase.png,widgetsChars.pngが未入力な場合に呼び出されるエラー
function emptyPath(emptyElement) {
  if (
    !(
      emptyElement == 'base' ||
      emptyElement == 'chars' ||
      emptyElement == 'json' ||
      emptyElement === 'options' ||
      emptyElement === 'output'
    )
  ) {
    throw Error(`Invalid value passed for emptyPath: ${emptyElement}`);
  }
  console.error(`${emptyElement}が入力されていない`);
  $('#convertError').append(`${emptyElement}のpathが入力されていません<br>`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function invalidPath(invalidElement) {
  if (
    !(invalidElement == 'base' || invalidElement == 'chars' || invalidElement == 'json' || invalidElement == 'output')
  ) {
    throw Error(`Invalid value passed for invalidPath: ${invalidElement}`);
  }
  console.error(`${invalidElement}が不正な値です`);
  $('#convertError').append(`${invalidElement}のpathが無効です<br>`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function selectedRightnessNotImageBase(conditions) {
  $('#convertError').append(`widgetsBase.png(widgets.png)の画像が適切ではありません<br>`);
  if (!conditions[0]) {
    $('#convertError').append(`  widgetsBase.png(widgets.png)の画像がpngではありません<br>`);
  }
  if (!conditions[1]) {
    $('#convertError').append(`- widgetsBase.png(widgets.png)の横幅がデフォルトの倍数ではありません<br>`);
  }
  if (!conditions[2]) {
    $('#convertError').append(`- widgetsBase.png(widgets.png)の縦幅がデフォルトの倍数ではありません<br>`);
  }
  if (!conditions[3]) {
    $('#convertError').append(`- widgetsBase.png(widgets.png)の横幅と縦幅の比が1:1ではありません<br>`);
  }
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function selectedRightnessNotImageChars(conditions) {
  $('#convertError').append(`widgetsChars.pngの画像が適切ではありません<br>`);
  if (!conditions[0]) {
    $('#convertError').append(`  widgetsChars.pngの画像がpngではありません<br>`);
  }
  if (!conditions[1]) {
    $('#convertError').append(`- widgetsChars.pngの横幅がjsonファイルのunit.widthの倍数ではありません<br>`);
  }
  if (!conditions[2]) {
    $('#convertError').append(`- widgetsChars.pngの縦幅がjsonファイルのunit.heightの倍数ではありません<br>`);
  }
}

//chars.jsonが不正な時
function illegalJSONPassed() {
  $('#charsJsonError').text('JSONファイルの文法に誤りがあります');
}

function noUnit() {
  $('#charsJsonError').text('jsonからunitが見つかりません');
}

function unitPropertyIsIllegal() {
  $('#charsJsonError').text('jsonのunitのプロパティに誤りがあります');
}

function unitWidthIsInvalid() {
  $('#charsJsonError').text('jsonのunit.widthの数値が1~20ではありません');
}

function unitHeightIsInvalid() {
  $('#charsJsonError').text('jsonのunit.heightの数値が1~20ではありません');
}

function noSupportKey() {
  $('#charsJsonError').text('jsonからsupportKeyが見つかりません');
}

function supportKeyIsNotArray() {
  $('#charsJsonError').text('jsonのsupportKeyが配列ではありません');
}

function supportKeyValueIsNotString() {
  $('#charsJsonError').text('jsonのsupportKeyが文字列ではありません（"または\'で囲われていません）');
}

function supportKeyLengthIsZero() {
  $('#charsJsonError').text('jsonのsupportKeyのプロパティに要素がありません');
}

function unsupportedKeyIsExists(key) {
  $('#charsJsonError').text(
    `jsonのsupportKeyに未対応のkey(${key} etc...)が含まれています(現在1.13以降のkeyのみに対応しています)`
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
  nonResourcePackHasBeenSelected,
  widgetsDoesNotFound,
  gameDirNotFound,
  emptyPath,
  invalidPath,
  selectedRightnessNotImageBase,
  selectedRightnessNotImageChars,
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
  duplicatedBasePathAndOutputPath,
};
