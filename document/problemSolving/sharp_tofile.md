# electron devtools was disconnected from the page...ってなる

## 原因

sharp.jsの`sharpObject.toFile('path')`で`path`に`./存在しないディレクトリ/ファイル名`と指定していたのが問題
問題のある行くらい出力してくれ（半ギレ）

# electronでhtmlに表示しない画像ファイルを扱いたい

## 問題

electron-builderでビルドすると画像が同梱されず、「ファイルが見つかりませんと」なる

## 原因

おそらくindex.htmlで読み込まれるjsのrequire等で読み込まれていないファイルはパッケージングされない。

## 解決法

使いたい画像をBase64に変換し、文字列としてJavaScript内で定数にぶち込む
