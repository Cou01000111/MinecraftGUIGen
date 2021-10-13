electronでアプリ作りたい！！！

# まとめ

## package.jsonの件
>注意: author と description のフィールドはパッケージ化に必要です。これが無ければ、npm run make の実行でエラーが発生します。

## yarn
`yarn add -dev electron`
ではなく
`yarn add electron`

## windowサイズ固定
```js
✖ mainWindow.setresizeble = false;
〇 mainWindow.setresizeble(false);
```

## 外部ファイルの使用
`nodeIntegration:true`にして`require`で読み込む

## 画像の使用
htmlで使ってる=>そのまま一緒にビルドされる
htmlで使ってない=>Base64に変換して文字列として保持する

## ファイル選択後にいろいろする
thenの後にいろいろ書く

```js
ipcMain.on('open-file-dialog', (event) => {
    console.log('1');
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result)=>{
        console.log('2');
        if (result) {
            console.log(`selected :${result}`);
            event.sender.send('selected-directory' , result)
        }
    })
})
```

## es-lintを使いたい

[ここにすべてが書いてある](https://zuma-lab.com/posts/eslint-prettier-settings)

# 公式クイックスタートを参考にする
## そのままパクる

[公式クイックスタート](https://www.electronjs.org/docs/tutorial/quick-start)を参考にとりあえずやってみる

環境
- Windows 10 Home
- Node.js v14.15.1

npmは使ったことがないのでyarnを使いたいが後で痛い目を見たくないためとりあえずnpmでやってみる

`npm start`でエラー発生
```log
npm ERR! missing script: start

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Cou\AppData\Roaming\npm-cache\_logs\2021-04-12T18_49_47_866Z-debug.log
```

ディレクトリ勘違いしてた

`npm run make`でエラー発生
```log

> my-electron-app@1.0.0 make C:\Users\Cou\Documents\programing\my-electron-app
> electron-forge make

✔ Checking your system
✔ Resolving Forge Config
We need to package your application before we can make it
✔ Preparing to Package Application for arch: x64
✔ Preparing native dependencies
✔ Packaging Application
Making for the following targets: squirrel
✖ Making for target: squirrel - On platform: win32 - For arch: x64

An unhandled error has occurred inside Forge:
An error occured while making for target: squirrel
Failed with exit code: 1
Output:
'my_electron_app.nuspec' ����p�b�P�[�W���r���h���Ă��܂��B
Authors is required.
Description is required.

Error: Failed with exit code: 1
Output:
'my_electron_app.nuspec' ����p�b�P�[�W���r���h���Ă��܂��B
Authors is required.
Description is required.

    at ChildProcess.<anonymous> (C:\Users\Cou\programing\my-electron-app\node_modules\electron-winstaller\src\spawn-promise.ts:52:16)
    at ChildProcess.emit (events.js:315:20)
    at ChildProcess.EventEmitter.emit (domain.js:486:12)
    at maybeClose (internal/child_process.js:1048:16)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:288:5)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! my-electron-app@1.0.0 make: `electron-forge make`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the my-electron-app@1.0.0 make script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\Cou\AppData\Roaming\npm-cache\_logs\2021-04-12T18_55_35_348Z-debug.log
```

deeplに突っ込んだ感じ署名と説明がないと
package.json見た感じその二項目は空白になっていたので適当なものを追加したら解決

>注意: author と description のフィールドはパッケージ化に必要です。これが無ければ、npm run make の実行でエラーが発生します。

というか公式でちゃんと書いてて草
## yarn を使ってみる
[npmとyarnのコマンド早見表](https://qiita.com/rubytomato@github/items/1696530bb9fd59aa28d8)を参考にいろいろ
```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```
を
```sh
mkdir my-electron-app
cd my-electron-app
yarn init -y
yarn add -dev electron
```

`yarn start`にてエラー発生
```log
yarn run v1.22.10
warning package.json: No license field
$ electron .
'electron' は、内部コマンドまたは外部コマンド、
操作可能なプログラムまたはバッチ ファイルとして認識されていません。
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

まぁそりゃそうだよなって感じ
というかいままでどうして`electron .`が実行できてたんだろう
npmで作った環境消しちまったよちくしょう

とおもったら[こんなサイト](https://toragramming.com/crossplatform/electron/electron-env-2019/)を見つけた
yarn版のコマンドもあるしよさそう

`yarn add -dev electron`
ではなく
`yarn add electron`
でインストール

したら解決した

とりあえず[ここ](https://qiita.com/y-tsutsu/items/179717ecbdcc27509e5a)を参考に頑張る
# ウィンドウサイズが変更できないようにしたい
```js
mainWindow.setresizeble = false;
```
でできないぞ？
```js
mainWindow.setresizeble(false);
```
だったわ
# importがｲﾐﾜｶﾗﾝ
```js
import { ipcRenderer } from "electron";
import $ from "jquery";
const selectDirBtn = $('selectResoucePack');
selectDirBtn.addEventListener('click',(e)=>{
    ipcRenderer.send('open-file-dialog');
});

ipcRenderer.on('selected-directory',(e,path)=>{
    console.log(`You selected : ${path}`);
});

```
の一行目で
```
SyntaxError: Cannot use import statement outside a module
```
とでる
モジュールの外側でimportステートメントが使てないってか？
じゃあrequireを使おうとするともちろんエラーが出る
```
Uncaught ReferenceError: require is not defined
at selectResoucePack.js:1
```

[【ECMAScript】importでSyntaxError](https://qiita.com/ROYH/items/4af792fb6bca7f5850c9)を参考に対策
どうやら

- 実行時オプションに --experimental-modules を指定する
- ファイル拡張子を変更する(js -> mjs) or package.json を作成する

で解決するらしい
が、まず実行時オプションの加え方がわからない
ファイル拡張子に関してはまず追加するモジュールは`electron`のためファイル拡張子は変えられない
なのでとりあえずpackage.jsonを変更してみる

すると
```
App threw an error during load
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js
require() of ES modules is not supported.
require() of C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js from C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js is an 
ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1169:13)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
    at Function.f._load (electron/js2c/asar_bundle.js:5:12633)
    at loadApplicationPackage (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:110:16)
    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:222:9)
    at Module._compile (internal/modules/cjs/loader.js:1152:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
```
というエラーが出てまず起動すらできない

なるほど

どうやらこのエラーによるとmain.jsでのESモジュールの読み込みにはimportが必要で、requireはサポートされていないということが書いてあります（Deeplに突っ込んで何とかわかった）

というわけでmain.jsを書き換えてみます
```js
- const { app, Menu, BrowserWindow, ipcMain, dialog } = require('electron');
+ import { app, Menu, BrowserWindow, ipcMain, dialog } from "electron";
```

すると
```
App threw an error during load
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js
require() of ES modules is not supported.
require() of C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js from C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js is an 
ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1169:13)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
    at Function.f._load (electron/js2c/asar_bundle.js:5:12633)
    at loadApplicationPackage (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:110:16)
    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:222:9)
    at Module._compile (internal/modules/cjs/loader.js:1152:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
```
というエラーが
というかこれ前回と同じエラー
requireをimportにすればいいって問題じゃないのか・・・？

上記のエラー文に
```
Instead rename C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js to end in .cjs, change the requiring code to use import(), or remove "type": 
```
とあるように
- main.jsの末尾を.cjsにリネーム
- importを使うようにrequiring codeを変える
- typeを削除
のどれかをしろ
ということです(エラー文をちゃんと読もうね(戒め))
上記の**typeを削除**に関しては削除しても振出しに戻るので却下
**importを使うようにrequiring codeを変える**に関してはやってるんだが・・・？
というわけで必然的に**main.jsの末尾を.cjsにリネーム**になるわけなんですが、cjsとは・・・？
## cjsについて調べてみた
どうやらこれはjsのモジュールのシステムについて理解しないときつそう
[ここ]()を参考にいろいろまとめる
### ES Modulesについて(ESM)
> ESM は ES2015 から仕様に入ったモジュールシステムです。 仕様は ECMAScript の 15.2 Modules に記載されています。
読み込み方
```js
import { KintoneAPIClient } from "@kintone/rest-api-client";
```

### CommonJS Modulesについて(CJS)
>しかし、Node.js では古くから require 関数を使ってモジュールを読み込む CommonJS Modules（以下 CJS） を採用していました。
```js
const { KintoneAPIClient } = require("@kintone/rest-api-client");
```
おや
>実は Node.js v8 から ESM を使うことが出来ます。v8 ~ v12 までは実行時に --experimental-modules フラグをつける必要がありましたが、v12.17.0 からはフラグなしでも実行できます。
という記述があります
今回使っているnodejsのバージョンは14系なので、「実行時オプションに --experimental-modules を指定する」は必要なさそうです（記事だとv12.12）
というかこの理論だとmain.jsで読み込んでいるelectronはcjsのはずなのでrequireであってるはずなんだが・・・・？
## というわけで

じゃぁもどしてみよう
```
App threw an error during load
Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js
require() of ES modules is not supported.
require() of C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js from C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js is an 
ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1169:13)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
    at Function.f._load (electron/js2c/asar_bundle.js:5:12633)
    at loadApplicationPackage (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:110:16)
    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:222:9)
    at Module._compile (internal/modules/cjs/loader.js:1152:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
```
し　っ　て　た　。（前と同じ）

というかそもそもmain.jsでrequireつかってるのってelectronの公式API Demoアプリで紹介されているコードなんだよなぁ・・・
一体何が悪いんだろう

正直もう何もできないので一旦`package.json`の`"type"`を消してみる
そうするともちろん
```js
Uncaught ReferenceError: require is not defined
    at selectResoucePack.js:1
```
となります


どうやら`nodeIntegration:true`にすると(デフォルトだとfalse)解決するらしい
これは別のwebサーバーに接続して他人のコードを使うとnodeの機能を使われて危ないので脆弱性問題的にoffになっているらしいが自分で作った物ならいいんじゃないかと外人ニキが言ってた

というわけで解決
# x.y is not a function

こういう時はxに問題があることが多い（気がする）
エラーが出たコードは次の通り
```js
const selectDirBtn = $('selectResoucePack');
selectDirBtn.addEventListener('click',(e)=>{
    ipcRenderer.send('open-file-dialog');
});
```
たぶんこれはjqueryによって生成されるオブジェクトにaddEventListenerがないということ（今回は場合は）
```js
const selectDirBtn = document.getElementById('selectResoucePack');
selectDirBtn.addEventListener('click',(e)=>{
    ipcRenderer.send('open-file-dialog');
});
```
これで解決
# console log なんもわからん
これはメインプロセスのコードなのですが、なぜか全てのlogが表示されません

```js
ipcMain.on('open-file-dialog', (event) => {
    console.log('1');
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, (files) => {
        console.log('2');
        if (files) {
            console.log(`selected :${files}`);
            event.sender.send('selected-directory', files)
        }
    })
})
```
これはレンダラプロセスから`open-file-dialog`を受け取り、処理を行うコード（になっているはず）です
## 自分の予想
1. イベント発火
2. `console.log('1');`
3. ファイル選択
4. `console.log('2');`
5. filesがtrueになる場合のみ`console.log(`selected :${files}`);`

## 実際
1. イベント発火
2. `console.log('1');`
3. ファイル選択

つまり`console.log('2');`以降のlogが出力されていない
または、`console.log('2');`以降が動いていない状態です

で、ここで自分はlogの仕様が複雑なのかなと思ったのですが、これコードが動いていないだけでは


というわけで[公式のドキュメント](https://www.electronjs.org/docs/api/dialog)を確認すると`dialog.showOpenDialog(options,callback)`なんて記法はどこにもない

見たところresultを取得したい場合は以下のようにしてみる
```js
ipcMain.on('open-file-dialog', (event) => {
    console.log('1');
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result)=>{
        console.log('2');
        if (result) {
            console.log(`selected :${result}`);
            event.sender.send('selected-directory' , result)
        }
    })
})
```
とりあえずこれで全てのlogがうごいた
ここから頑張ってdirectoryのpathを取得する

# pugを使いたい
今のところ自分にある知識だとコードを使ってpugをhtmlファイルにするには
```js
const pug = requrie('pug');
var data = pug.render(/*pugのファイル*/)
```
とすればdataにhtmlが入るはず

まぁそれではelectronに入れられないのでぐぐると`electron-pug`なるものがヒット

公式のUsageを見ると
```js
'use strict';
 
const {app, BrowserWindow} = require('electron')
const locals = {/* ...*/}
const setupPug = require('electron-pug')
 
// Standard stuff
 
app.on('ready', async () => {
  try {
    let pug = await setupPug({pretty: true}, locals)
    pug.on('error', err => console.error('electron-pug error', err))
  } catch (err) {
    // Could not initiate 'electron-pug'
  }
 
  let mainWindow = new BrowserWindow({ width: 800, height: 600 })
 
  mainWindow.loadURL(`file://${__dirname}/index.pug`)
  // the rest...
})
```

とあるのでとりあえずそれをコピペして動かすとシンタックスエラーで動かない
3年前のモジュールなのでそんな気はしてたが・・・
エラー内容は
```
C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\main.js:9
        let pug = await setupPug({ pretty: true }, locals)
                  ^^^^^

SyntaxError: await is only valid in async function
    at wrapSafe (internal/modules/cjs/loader.js:1060:16)
    at Module._compile (internal/modules/cjs/loader.js:1108:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
    at Function.f._load (electron/js2c/asar_bundle.js:5:12633)
    at loadApplicationPackage (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:110:16)
    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron\dist\resources\default_app.asar\main.js:222:9)
    at Module._compile (internal/modules/cjs/loader.js:1152:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
```

ここでawaitの仕様を思い出してみるとたしかC#でもasync function内でしか使えなかったはずです
コードは今現在こうなっているので
```js
function createWindow() {
    try {
        let pug = await setupPug({ pretty: true }, locals)
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: `${__dirname}/preload.js`,    // preloadを追加
            enableRemoteModule: true,               // warning対策
            nodeIntegration: true
        },
    });

    // ...
}
```
これを

```js
async function createWindow() {
    try {
        let pug = await setupPug({ pretty: true }, locals)
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: `${__dirname}/preload.js`,    // preloadを追加
            enableRemoteModule: true,               // warning対策
            nodeIntegration: true
        },
    });

    // ...
}
```
でok

# app.getPath()でエラーが出る
[ここ](https://stackoverflow.com/questions/60444303/error-when-using-electron-app-getpathhome)でなんとかできta

# dialogをキャンセルするたびにエラーが出る
main.js
```js
ipcMain.on('open-resourcepack-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result) {
            event.sender.send('selected-directory', result.filePaths[0])
        }
    })
})
```
↓
```js
ipcMain.on('open-resourcepack-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then((result) => {
        if (result.canceled == false) {
            event.sender.send('selected-directory', result.filePaths[0])
        }
    })
})
```
むかしはresultだけで判断できていたのか、v11だとこうする必要がありました

# 自作のcjsモジュールで`Cannot find module '../../lib/linefeed.js`
```
├─lib
│   └─linefeed.js
└─src
    ├─js
    │  └─selectResoucePack.js
    └─style
```

こんな感じの構成で

linefeed.js
```js
function util.getLFCode(text) {
    if (text.indexOf("\r\n") > -1) {
        return "\r\n";
    } else if (text.indexOf("\n") > -1) {
        return "\n";
    } else if (text.indexOf("\r") > -1) {
        return "\r";
    }
}

module.exports = { util.getLFCode };
```

selectResourcePack.js
```js
const lf = require('../../lib/linefeed.js');
```
という風に読み込んでいます

で、エラー内容が開発者ツールのconsoleで

```
internal/modules/cjs/loader.js:972 Uncaught Error: Cannot find module '../../lib/linefeed.js'
Require stack:
- C:\Users\Cou\programing\MinecraftWidgetsAddChara\src\index.pug
    at Module._resolveFilename (internal/modules/cjs/loader.js:972)
    at Function.o._resolveFilename (electron/js2c/renderer_init.js:35)
    at Module._load (internal/modules/cjs/loader.js:848)
    at Function.f._load (electron/js2c/asar_bundle.js:5)
    at Module.require (internal/modules/cjs/loader.js:1032)
    at require (internal/modules/cjs/helpers.js:72)
    at selectResourcePack.js:5
```

linefeed.jsにあるlfモジュールはcjsモジュールなのでそれを前提にいろいろ調べていきます

https://qiita.com/DNA1980/items/11fdb7233fc288ac3502

これみたところなんか`yarn add modulename`みたいなコマンドが必要だったような・・・？
というわけで
```sh
yarn add .\lib\linefeed.js
yarn add v1.22.10
[1/4] Resolving packages...
error An unexpected error occurred: "https://registry.yarnpkg.com/lib/linefeed.js: Request \"https://registry.yarnpkg.com/lib/linefeed.js\" returned a 405".
info If you think this is a bug, please open a bug report with the information provided in "C:\\Users\\Cou\\programing\\MinecraftWidgetsAddChara\\yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

いやでもn予備校3-5で必要って書かれてるしなぁ・・・
というわけでしっかりerrorをみてみる
`an unexpected error occurred = 予期せぬエラーが発生しました`

つっかえねぇ・・・

スラッシュの向きでは？とおもい
```sh
yarn add ./lib/linefeed.js
yarn add v1.22.10
[1/4] Resolving packages...
[2/4] Fetching packages...
error An unexpected error occurred: "EINVAL: invalid argument, mkdir 'C:\\Users\\Cou\\AppData\\Local\\Yarn\\Cache\\v6\\npm-sers-ou-programing-inecraft-idgets-dd-hara-lib-0.0.0-e123d8c6-02dd-46f6-b38d-fe79ec126fcd-1619104706297\\node_modules\\C:\\Users\\Cou\\programing\\MinecraftWidgetsAddChara\\lib'".
info If you think this is a bug, please open a bug report with the information provided in "C:\\Users\\Cou\\programing\\MinecraftWidgetsAddChara\\yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```
アタリな気がする

なんかキャッシュが関係ありそうなのでキャッシュクリア
```sh
yarn cache clean --force
yarn cache v1.22.10
success Cleared cache.
Done in 5.94s.
PS C:\Users\Cou\programing\MinecraftWidgetsAddChara> yarn add ./lib/linefeed.js
yarn add v1.22.10
[1/4] Resolving packages...
[2/4] Fetching packages...
error An unexpected error occurred: "EINVAL: invalid argument, mkdir 'C:\\Users\\Cou\\AppData\\Local\\Yarn\\Cache\\v6\\npm-sers-ou-programing-inecraft-idgets-dd-hara-lib-0.0.0-26ddd1a2-a828-4ccd-8d35-41627020c803-1619104790152\\node_modules\\C:\\Users\\Cou\\programing\\MinecraftWidgetsAddChara\\lib'".
info If you think this is a bug, please open a bug report with the information provided in "C:\\Users\\Cou\\programing\\MinecraftWidgetsAddChara\\yarn-error.log".
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

https://blog.cloud-acct.com/posts/yarn-error-flatmap/

関係がありそうなので
1. node_modules削除
2. yarn-lock削除
3. `yarn install`

が前と同じエラーが
EINVALについて気になったのだがyahoo知恵袋でmicrosoftのページを見た感じC#火なんかのエラーっぽいけど
> invalid argument. An invalid value was given for one of the arguments to a function. For example, the value given for the origin when positioning a file pointer (by means of a call to fseek) is before the beginning of the file.

> 無効な引数。関数の引数の1つに無効な値が与えられました。例えば，fseekの呼び出しによってファイルポインタを位置決めする際の原点に与えられた値は，ファイルの先頭よりも前にあります。

という説明があった
引数がダメそう・・・？

よくよく考えたら`linefeed`周りで`yarn init`とかやってなかった
というわけでlibにlinefeedを作りその中にindex.jsを配置
`yarn init`

で解決

してない

`yarn init`でつくって`yarn install`するとライブラリの中身を更新してもいちいちインストールしなおさないといけない
で試しに`main.js`で読み込んでみたが、特に問題なかったのでおそらくレンダラプロセスでアクセスできないのだろうか

htmlのほうに`    script(src="./lib/lf.js") `
を追加してみる

# electron-forge/cliでのパッケージングでエラー
```s
yarn add --dev @electron-forge/cli
yarn electron-forge import
yarn run make
```
`yarn run make`でエラー

```s
yarn run v1.22.10
$ electron-forge make
✔ Checking your system
✔ Resolving Forge Config
We need to package your application before we can make it
✔ Preparing to Package Application for arch: x64
⠏ Preparing native dependencies: 0 / 1gyp ERR! find Python 
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if "python3" can be used
gyp ERR! find Python - "python3" is not in PATH or produced an error
gyp ERR! find Python checking if "python" can be used
gyp ERR! find Python - "python" is not in PATH or produced an error
gyp ERR! find Python checking if "python2" can be used
gyp ERR! find Python - "python2" is not in PATH or produced an error
gyp ERR! find Python checking if Python is C:\Python37\python.exe
gyp ERR! find Python - "C:\Python37\python.exe" could not be run
gyp ERR! find Python checking if Python is C:\Python27\python.exe
gyp ERR! find Python - "C:\Python27\python.exe" could not be run
gyp ERR! find Python checking if the py launcher can be used to find Python
gyp ERR! find Python - "py.exe" is not in PATH or produced an error
gyp ERR! find Python 
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python="C:\Path\To\python.exe"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python "C:\Path\To\python.exe"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
✖ Preparing native dependencies: 0 / 1

An unhandled error has occurred inside Forge:
node-gyp failed to rebuild 'C:\Users\Cou\AppData\Local\Temp\electron-packager\win32-x64\my-electron-app-win32-x64\resources\app\node_modules\sharp'.
Error: Could not find any Python installation to use


Error: node-gyp failed to rebuild 'C:\Users\Cou\AppData\Local\Temp\electron-packager\win32-x64\my-electron-app-win32-x64\resources\app\node_modules\sharp'.
Error: Could not find any Python installation to use


    at ModuleRebuilder.rebuildNodeGypModule (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron-rebuild\src\module-rebuilder.ts:231:13)
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
    at Rebuilder.rebuildModuleAt (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron-rebuild\src\rebuild.ts:283:5)
    at Rebuilder.rebuild (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\electron-rebuild\src\rebuild.ts:189:9)
    at C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\@electron-forge\core\src\util\rebuild.ts:33:5
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

pythonいれたらこのエラーは消えたけどこんどはSetup.exeが起動できない

package.jsonのstartが書き換えられているのでsrcで起動するように修正
```json
    "start": "electron-forge start ",
    ↓
    "start": "electron-forge start src",
```

すると
```s
App threw an error during load
Error: 
Something went wrong installing the "sharp" module

The specified module could not be found.
\\?\C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\sharp\build\Release\sharp.node

- Remove the "node_modules/sharp" directory then run
  "npm install --ignore-scripts=false --verbose sharp" and look for errors
- Consult the installation documentation at https://sharp.pixelplumbing.com/install
- Search for this error at https://github.com/lovell/sharp/issues

    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\sharp\lib\constructor.js:32:9)
    at Module._compile (internal/modules/cjs/loader.js:1152:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1173:10)
    at Module.load (internal/modules/cjs/loader.js:992:32)
    at Module._load (internal/modules/cjs/loader.js:885:14)
    at Function.f._load (electron/js2c/asar_bundle.js:5:12633)
    at Module.require (internal/modules/cjs/loader.js:1032:19)
    at require (internal/modules/cjs/helpers.js:72:18)
    at Object.<anonymous> (C:\Users\Cou\programing\MinecraftWidgetsAddChara\node_modules\sharp\lib\index.js:3:15)
```
error文でやったほうがよさそうなこと
- Remove the "node_modules/sharp" directory then run
  "npm install --ignore-scripts=false --verbose sharp" and look for errors
- Consult the installation documentation at https://sharp.pixelplumbing.com/install
- Search for this error at https://github.com/lovell/sharp/issues
deepl翻訳
- node_modules/sharp」ディレクトリを削除します。
  "npm install --ignore-scripts=false --verbose sharp "を実行してエラーを確認してください。
- https://sharp.pixelplumbing.com/install のインストールドキュメントを参照してください。
- https://github.com/lovell/sharp/issues でこのエラーを検索してください。

npmではなくyarnをつかっているので
```sh
yarn add --ignore-scripts=false --verbose sharp`
```
何も考えないでこれ打ったけどちゃんとうごいてる
yarn のnpmとの互換性凄い

何も考えないでそのあと`yarn start`したけどエラー
`yarn add --ignore-scripts=false --verbose sharp`のエラー見ないといけなかったぽいけど、それっぽいのは
```
[4/4] Building fresh packages...
warning Ignored scripts due to flag.
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
├─ false@0.0.4
└─ sharp@0.28.1
info All dependencies
├─ false@0.0.4
└─ sharp@0.28.1
Done in 227.91s.
```
しかない

諦めてelectron-builderを使うことにした

# electron v12系で動かない理由
[これ](https://laptrinhx.com/electron-de-require-is-not-defined-gadoushitemo-xiaoenaitoki-705136531/)関係ありそう

# electron-builderでsrcだけを出力したい
## jp
フォルダ構成
```
root
├ app
│ ├ src
│ │ ├ main.js
│ │ └ package.json
│ └ package.json
└ build
　 └ icon.ico
```
app/package.json
```json
{
  "name": "minecraft-widgets-gen",
  "version": "0.2.0",
  "author": "courange",
  "description": "Add text to the minecraft hotbar.",
  "main": "src/main.js",
  "scripts": {
    "start": "electron src",
    "build:mac": "electron-builder --mac --x64",
    "build:win": "electron-builder --win --x64"
  },
  "dependencies": {
    "electron-log": "^4.3.5",
    "electron-pug": "^2.0.0",
    "electron-updater": "^4.3.8",
    "jquery": "^3.6.0",
    "pug": "^3.0.2",
    "sharp": "^0.28.1"
  },
  "license": "MIT",
  "devDependencies": {
    "electron": "11.4.3",
    "electron-builder": "^22.10.5"
  },
  "build": {

    "mac": {
      "target": "dmg"
    },
    "win": {
      "icon": "../build/icon.ico",
      "target": "nsis"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "publish": {
      "provider": "github",
      "owner": "Cou01000111",
      "repo": "MinecraftWidgetsGen"
    },
    "directories":{
      "output":"../output_${version}"
    },
    "artifactName":"${productName}-Setup-${version}.${ext}"

  }
}
```
app/src/package.json
```json
{
    "main": "main.js"
}
```

`yarn start`や`yarn build:win`などのコマンドはapp/でつかってます
package.jsonが二つある理由はよくわかっていませんが、自分が参考にしたサイトではこうなっていたので、このまま使っています（もしよかったらその理由も教えていただけると嬉しいです）

appにあるもののみをアプリケーションとして配布したのですが、このままだとroot全体がパッケージングされてしまいます
いまいちelectron-builderのbuild>filesや、build>directories>appの使い方がわかっていないのでappのみをパッケージングする方法がわかりません
それのやり方を教えてください
[GitHub](https://github.com/Cou01000111/MinecraftWidgetsGen)

## en
Folder Structure
```
root
├ app
│ ├ src
│ │ ├ main.js
│ │ └ package.json
│ └ package.json
└ build
　 └ icon.ico
```
app/package.json
```json
{
  "name": "minecraft-widgets-gen",
  "version": "0.2.0",
  "author": "courange",
  "description": "Add text to the minecraft hotbar.",
  "main": "src/main.js",
  "scripts": {
    "start": "electron src",
    "build:mac": "electron-builder --mac --x64",
    "build:win": "electron-builder --win --x64"
  },
  "dependencies": {
    "electron-log": "^4.3.5",
    "electron-pug": "^2.0.0",
    "electron-updater": "^4.3.8",
    "jquery": "^3.6.0",
    "pug": "^3.0.2",
    "sharp": "^0.28.1"
  },
  "license": "MIT",
  "devDependencies": {
    "electron": "11.4.3",
    "electron-builder": "^22.10.5"
  },
  "build": {

    "mac": {
      "target": "dmg"
    },
    "win": {
      "icon": "../build/icon.ico",
      "target": "nsis"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "publish": {
      "provider": "github",
      "owner": "Cou01000111",
      "repo": "MinecraftWidgetsGen"
    },
    "directories":{
      "output":"../output_${version}"
    },
    "artifactName":"${productName}-Setup-${version}.${ext}"

  }
}
```
app/src/package.json
```json
{
    "main": "main.js"
}
```

Commands such as `yarn start` and `yarn build:win` are used in app/.
I'm not sure why there are two package.json files, but that's how it is in the site I referred to, so I'm using it as is (I'd be happy to know the reason if you want).

I've distributed only the app as an application, but if I don't, the whole root will be packaged.
I don't know how to package only the app because I don't understand how to use build>files and build>directories>app in electron-builder.
Please tell me how to do that.
[GitHub](https://github.com/Cou01000111/MinecraftWidgetsGen)
※Translated using deelp
