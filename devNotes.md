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
