# Minecraft Texted Hotbar Gen

Minecraft のリソースパックを読み込ませるとキーコンフィグを参照してホットバーにショートカットキーを追加するアプリケーションです。

## このアプリケーションでできること

minecraftのホットバーがあるwidgets.pngの元である「widgetsBase.png」と文字データがある「widgetsChars.png」、widgetsChars.pngの構造について書いてある「widgetsChars.json」とホットバーに使われているショートカットキーが書いてある「options.txt」から文字付ホットバーを生成します。(下記画像はホットバーのショートカットに「Mouse Button 4, Mouse Button 5, 3, 4, f, g, v, b, r」が使われている場合の出力例)

![「widgetsBase.png」+「widgetsChars.png」+「widgetsChars.json」+「options.txt」=>「widgets.png」](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/MCTHG_doc.png)


## リソースパック利用者へ

このツールは無からリソースパックを生み出すものではなく、当アプリケーション対応リソースパック又はリソースパック内に`resourcepack\assets\minecraft\textures\gui\widgets.png`を含むリソースパックを読み込ませて使うものです。

今のところ当アプリケーション対応リソースパックは確認できておりません。そのため、一般的に配付されているリソースパックに当アプリケーションデフォルトの文字を追加するか、Couが当アプリケーション対応リソースパックを制作するまでお待ちください。

また、著作権法の観点から当アプリケーションを使用し作成したリソースパックは、リソースパック制作者の許可がない限り二次配布はお控えください。

## リソースパック作成者へ

当アプリケーション（Minecraft Texted Hotbar Gen）は当アプリケーション対応リソースパックではなくても使うことができますが、当アプリケーション用にリソースパックの`resourcepack\assets\minecraft\textures\gui`内に「widgetsChars.png」と「widgetsChars.json」を置いていただくとホットバーにオリジナルの文字を配置できます。

サンプルをGitHubに上げているので見て頂ければ幸いです。

### widgetsBase.pngの描き方
書き途中
### widgetsChars.pngの描き方
書き途中
### widgetsChars.jsonの描き方
書き途中

## FAQ

### THG対応リソースパックとは？
`resourcepack\assets\minecraft\textures\gui\`に以下三つのファイルがあるリソースパックのことを指します

- widgetsBase.png(ない場合はwidgets.pngが使われます)
- widgetsChars.png(ない場合はアプリケーション付属のwidgetsChars.pngが使われます)
- widgetsChars.json(ない場合はアプリケーション付属のwidgetsChars.jsonが使われます)

ただし上記画像が全てなくても`widgets.png`さえあればホットバーに文字を追加することは可能です。
