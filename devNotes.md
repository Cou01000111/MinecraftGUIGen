electronでアプリ作りたい！！！

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
