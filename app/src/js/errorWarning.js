// 何かしらのエラーを表示するときはここにある関数を通じて標示する
function selectedOutOfSupportVersion() {
  $("#gameOptionError").text("未対応のバージョンのoptionが選ばれました");
}

function dirIsNotGameDir() {
  $("#gameOptionError").text("ゲームディレクトリを指定してください");
}

function nonGameDirectoryHasBeenSelected() {
  $("#gameOptionError").text(
    "minecraftのゲームディレクトリか、ゲームディレクトリにあるoptions.txtを指定して下さい"
  );
}

function NonResourcePackHasBeenSelected() {
  $("#errorMessage").text("minecraftのresource packを入れてください");
}

function widgetsDoesNotFound(params) {
  $("#errorMessage").text(
    "widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません"
  );
}

function gameDirNotFound() {
  $("#gameOptionError").text(
    "ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください"
  );
}

//widgetsBase.png,widgetsChars.pngが未入力な場合に呼び出されるエラー
function emptyPath(baseOrCharsOrJson) {
  if (
    !(
      baseOrCharsOrJson == "base" ||
      baseOrCharsOrJson == "chars" ||
      baseOrCharsOrJson == "json"
    )
  ) {
    throw error();
  }
  $("#convertError").append(
    `<br>${baseOrCharsOrJson}のpathが入力されていません`
  );
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function invalidPath(baseOrCharsOrJson) {
  if (
    !(
      baseOrCharsOrJson == "base" ||
      baseOrCharsOrJson == "chars" ||
      baseOrCharsOrJson == "json"
    )
  ) {
    throw error();
  }
  $("#convertError").append(`<br>${baseOrCharsOrJson}のpathが無効です`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function selectedRightnessNotImage(baseOrChars, conditions) {
  if (
    !(baseOrChars == "base" || baseOrChars == "chars") ||
    !(conditions.length == 4)
  ) {
    throw error();
  }
  $("#convertError").append(`<br>${baseOrChars}の画像が適切ではありません:`);
  if (!conditions[0]) {
    $("#convertError").append(`${baseOrChars}の画像がpngではありません`);
  }
  if (!conditions[1]) {
    $("#convertError").append(
      `${baseOrChars}の横幅がデフォルトの倍数ではありません`
    );
  }
  if (!conditions[2]) {
    $("#convertError").append(
      `${baseOrChars}の縦幅がデフォルトの倍数ではありません`
    );
  }
  if (!conditions[3]) {
    $("#convertError").append(
      `${baseOrChars}の横幅と縦幅の比が1:1ではありません`
    );
  }
}

//chars.jsonが不正な時
function illegalJSONPassed() {
  $("#charsJsonError").text("JSONファイルの文法に誤りがあります");
}

//unitがない
function noUnit() {
  $("#charsJsonError").text("jsonからunitが見つかりません");
}

function unitPropertyIsIllegal() {
  $("#charsJsonError").text("jsonのunitのプロパティに誤りがあります");
}

//unitのプロパティが不正

function resetError() {
  $("#errorMessage").text("");
  $("#baseError").text("");
  $("#charsError").text("");
  $("#charsJsonError").text("");
  $("#outputError").text("");
  $("#gameOptionError").text("");
}

function resetWarning() {
  $("#warningMessage").text("");
  $("#baseWarning").text("");
  $("#charsWarning").text("");
  $("#charsJsonWarning").text("");
  $("#outputWarning").text("");
  $("#gameOptionWarning").text("");
}

function resetConvertMessage() {
  $("#convertMessage").text("");
  $("#convertError").text("");
  $("#convertWarning").text("");
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
};
