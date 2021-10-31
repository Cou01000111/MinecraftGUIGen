const $ = require('jquery');
// 何かしらのエラーを表示するときはここにある関数を通じて標示する
function selectedOutOfSupportVersion() {
  $('#gameOptionError').append('未対応のバージョンのoptionが選ばれました<br>');
}

function dirIsNotGameDir() {
  $('#gameOptionError').append('ゲームディレクトリを指定してください<br>');
}

function nonGameDirectoryHasBeenSelected() {
  $('#gameOptionError').append(
    'minecraftのゲームディレクトリか、ゲームディレクトリにあるoptions.txtを指定して下さい<br>'
  );
}

function nonResourcePackHasBeenSelected() {
  $('#errorMessage').append('minecraftのresource packを選択してください<br>');
}

function widgetsDoesNotFound() {
  $('#errorMessage').append('widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません<br>');
}

function gameDirNotFound() {
  $('#gameOptionError').append(
    'ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください<br>'
  );
}

function duplicatedBasePathAndOutputPath() {
  $('#gameOptionError').append('今現在widgets.pngからwidgets.pngを出力することはできません<br>');
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
  $('#charsJsonError').append('JSONファイルの文法に誤りがあります<br>');
}

function noUnit() {
  $('#charsJsonError').append('jsonからunitが見つかりません<br>');
}

function unitPropertyIsIllegal() {
  $('#charsJsonError').append('jsonのunitのプロパティに誤りがあります<br>');
}

function unitWidthIsInvalid() {
  $('#charsJsonError').append('jsonのunit<br>.widthの数値が1~20ではありません');
}

function unitHeightIsInvalid() {
  $('#charsJsonError').append('jsonのunit<br>.heightの数値が1~20ではありません');
}

function noSupportKey() {
  $('#charsJsonError').append('jsonからsupportKeyが見つかりません<br>');
}

function supportKeyIsNotArray() {
  $('#charsJsonError').append('jsonのsupportKeyが配列ではありません<br>');
}

function supportKeyValueIsNotString() {
  $('#charsJsonError').append('jsonのsupportKeyが文字列ではありません（<br>"または\'で囲われていません）');
}

function supportKeyLengthIsZero() {
  $('#charsJsonError').append('jsonのsupportKeyのプロパティに要素がありません<br>');
}

function unsupportedKeyIsExists(key) {
  $('#charsJsonError').append(
    `jsonのsupportKeyに未対応のkey(${key} etc...)が含まれています(現在1.13以降のkeyのみに対応しています)<br>`
  );
}

function charsJsonPngMismatch() {
  $('#charsWarning').text('charsのjsonとpngが一致していない可能性があります');
  $('#charsJsonWarning').text('charsのjsonとpngが一致していない可能性があります');
}

function charsByNotSupportedKeySelected() {
  if (
    !$('#convertWarning')
      .text()
      .includes(
        'このリソースパックのJSONファイルでサポートされていないショートカットキーがoptions.txtにあったため、出力画像では空白になります'
      )
  ) {
    $('#convertWarning').append(
      'このリソースパックのJSONファイルでサポートされていないショートカットキーがoptions.txtにあったため、出力画像では空白になります<br>'
    );
  }
}

function insteadAppAttachmentJSONUsing() {
  $('#charsJsonWarning').text(
    $('#charsJsonWarning').text() + 'widgetsChars.jsonが見つかりませんでした。App付属のJSONファイルを使用します'
  );
}

function insteadAppAttachmentCharsUsing() {
  $('#charsWarning').text(
    $('#charsWarning').text() + 'widgetsChars.pngが見つかりませんでした。App付属のwidgetsChars.pngを使用します'
  );
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
  insteadAppAttachmentJSONUsing,
  insteadAppAttachmentCharsUsing,
};
