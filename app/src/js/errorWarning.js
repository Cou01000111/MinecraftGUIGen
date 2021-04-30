// 何かしらのエラーを表示するときはここにある関数を通じて標示する
function selectedOutOfSupportVersion() {
    $('#gameOptionError').text('未対応のバージョンのoptionが選ばれました');
}

function dirIsNotGameDir() {
    $('#gameOptionError')
        .text('ゲームディレクトリを指定してください');
}

function nonGameDirectoryHasBeenSelected() {
    $('#gameOptionError').text('minecraftのゲームディレクトリか、ゲームディレクトリにあるoptions.txtを指定して下さい');
}

function NonResourcePackHasBeenSelected() {
    $('#errorMessage').text('minecraftのresource packを入れてください');
}

function widgetsDoesNotFound(params) {
    $('#errorMessage').text('widgets.pngまたはwidgetsBase.pngが存在しないリソースパックは変換できません');
}

function gameDirNotFound() {
    $('#gameOptionError')
        .text('ゲームディレクトリが見つかりませんでした。minecraftのゲームディレクトリにあるoptions.txtを指定してください');
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function InvalidPath(baseOrCharsOrJson) {
    if (!(baseOrCharsOrJson == 'base' || baseOrCharsOrJson == 'chars' || baseOrCharsOrJson == 'json')) {
        throw error();
    }
    $('#convertError').text(`${baseOrCharsOrJson}のpathが無効です`);
}

//widgetsBase.png,widgetsChars.pngが無効な場合に呼び出されるエラー
function SelectedRightnessNotImage(baseOrChars) {
    if (!(baseOrChars == 'base' || baseOrChars == 'chars')) {
        throw error();
    }
    $('#convertError').text(`${baseOrChars}の画像が適切ではありません`);
}

//chars.jsonが不正な時
function illegalJSONPassed() {
    $('#charsJsonError').text('JSONファイルの文法に誤りがあります');
}

//unitがない
function noUnit() {
    $('#charsJsonError').text('jsonからunitが見つかりません');
}

function unitPropertyIsIllegal() {
    $('#charsJsonError').text('jsonのunitのプロパティに誤りがあります');
}

//unitのプロパティが不正

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
