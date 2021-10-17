# Minecraft Texted Hotbar Gen(MC_THG)

Minecraft のリソースパックを読み込ませるとキーコンフィグを参照してホットバーにショートカットキーを追加するアプリケーションです。

## このアプリケーションでできること

minecraftのホットバーがあるwidgets.pngの元である「widgetsBase.png」と文字データがある「widgetsChars.png」、widgetsChars.pngの構造について書いてある「widgetsChars.json」とホットバーに使われているショートカットキーが書いてある「options.txt」から文字付ホットバーを生成します。

THGSampleResourcepackをホットバーのショートカットキー`Mouse Button 4, Mouse Button 5, 3, 4, f, g, v, b, r`で当アプリケーションを用いて`widgets.png`生成している図

![「widgetsBase.png」+「widgetsChars.png」+「widgetsChars.json」+「options.txt」=>「widgets.png」](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/MCTHG_doc.png)

## 操作手順

アプリケーション画面

![](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/appUI.png)

### 1. 最上段の「SELECT RESOURCE PACK」からリソースパックを選択

選択するリソースパックは読み込みたいキーコンフィグに設定しているゲームディレクトリの`resourcepack`内にあるものを読み込むことを推奨します。
`widgets base path`、`widgets chars path`、`widgets charsJson path`、`output Path`、`options.txt`が自動入力されます

### 2. それぞれのオプションが正しいことを確認

#### 2-1. widgets base pathの確認

**widgets base path**には`widgetsBase.png`がある場合は`resourcepack\assets\minecraft\textures\gui\widgetsBase.png`が自動で入力され、`widgetsBase.png`が見つからなかった場合は`resourcepack\assets\minecraft\textures\gui\widgets.png`が選択されます。<br>
右側のファイルアイコンのボタンで手動でファイルを選択することができます。

#### 2-2. widgets chars pathの確認

アプリケーション付属の`widgetsChars.png`

![](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/default_widgetsChars.png)

**widgets chars path**には`resourcepack\assets\minecraft\textures\gui\widgetsChars.png`が自動で入力され、`widgetsChars.png`が見つからなかった場合はアプリケーション付属のwidgetsChars.png(`default_widgetsChars.png`(上記画像))が選択されます。<br>
右側のファイルアイコンのボタンで手動でファイルを選択することができます。

#### 2-3. widgets charsJson pathの確認

**widgets charsJson path**には`resourcepack\assets\minecraft\textures\gui\widgetsChars.Json`が自動で入力され、`widgetsChars.json`が見つからなかった場合はアプリケーション付属のwidgetsChars.json(`default_widgetsChars.json`(上記画像))が選択されます。<br>
右側のファイルアイコンのボタンで手動でファイルを選択することができます。

#### 2-4. output Pathの確認

**output Path**には`resourcepack\assets\minecraft\textures\gui\widgets.png`が存在しない場合はそのpathが自動入力されます。<br>
`resourcepack\assets\minecraft\textures\gui\widgets.png`が存在する場合は上書きしないために、`resourcepack\assets\minecraft\textures\gui\widgetsOutput.png`が自動入力されます。<br>
右側のフォルダアイコンで出力先を手動で設定できます。<br>
下の「widgets.pngを上書きする」にチェックを入れると`widgets.png`の存在の可否を問わず`resourcepack\assets\minecraft\textures\gui\widgets.png`が自動入力されます。

#### 2-5. options.txtの確認

**options.txt**には選択したリソースパックが存在するゲームディレクトリに存在する`options.txt`へのパスが自動入力されます。<br>
右から二番目のファイルアイコンで`options.txt`を直接指定できます。フォルダアイコンからはゲームディレクトリを選択でき、そのゲームディレクトリ内の`options.txt`へのパスが入力されます。

### 3. 変換を押下

ファイル出力成功した場合に限り「ファイル出力成功(widgets.png)」又は「ファイル出力成功(widgetsOutput.png)」というメッセージが表示されます。<br>
この出力メッセージのファイル名をクリックすると出力したファイルがエクスプローラーで表示されます。<br>
ファイル出力に失敗した場合は失敗した旨のメッセージが表示されますが、バグで表示されないことがあります。その際はお手数をおかけしますがissueなどで報告していただけると嬉しいです。

## リソースパック利用者へ

このツールは無からリソースパックを生み出すものではなく、当アプリケーション対応リソースパック又はリソースパック内に`resourcepack\assets\minecraft\textures\gui\widgets.png`を含むリソースパックを読み込ませて使うものです。

今のところ当アプリケーション対応リソースパックは確認できておりません。そのため、一般的に配付されているリソースパックに当アプリケーションデフォルトの文字を追加するか、Couが当アプリケーション対応リソースパックを制作するまでお待ちください。

また、著作権法の観点から当アプリケーションを使用し作成したリソースパックは、リソースパック制作者の許可がない限り二次配布はお控えください。

## リソースパック作成者へ

当アプリケーション（Minecraft Texted Hotbar Gen）は当アプリケーション対応リソースパックではなくても使うことができますが、当アプリケーション用にリソースパックの`resourcepack\assets\minecraft\textures\gui`内に「widgetsChars.png」と「widgetsChars.json」を置いていただくとホットバーにオリジナルの文字を配置できます。

サンプルをGitHubに上げているので見て頂ければ幸いです。

### widgetsBase.pngについて

いまのところ一般的なリソースパックや標準のテクスチャである`resourcepack\assets\minecraft\textures\gui\widgets.png`と特に変わりません

ただし、このアプリケーションはの場合はそれぞれ左上に文字を追加するのでそれを前提にデザインしていただければなと思います。

sample
![](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/THGSampleResourcepack/assets/minecraft/textures/gui/widgetsBase.png)

### widgetsChars.pngについて
この画像には実際に追加されるテキストのテクスチャの集合です。
基本的にはマス目上に文字を設置し、どこの画像がどのキーをサポートするかは後述のjsonファイルに記述します。<br>
ユーザーがMinecraftで使用可能な全てのキーをサポートする必要ありません。(なぜなら、ホットバーへのショートカットキーとしてPやO,Lなど明らかに左手で押せないキーは基本使われないためです。)<br>
制作者調べでは以下のリストのキーが対応していれば基本的には問題ないと思います。<br>

- 数字(1~7)
- Mouse Button 4(サムボタン)
- Mouse Button 5(サムボタン)
- q,r,t,f,g,x,c,v,b

sample
![](https://github.com/Cou01000111/minecraft-texted-hotbar-gen/blob/main/THGSampleResourcepack/assets/minecraft/textures/gui/widgetsChars.png)

### widgetsChars.jsonについて
書き途中

sample
![]()

## FAQ

### THG対応リソースパックとは？
`resourcepack\assets\minecraft\textures\gui\`に以下三つのファイルがあるリソースパックのことを指します

- widgetsBase.png(ない場合はwidgets.pngが使われます)
- widgetsChars.png(ない場合はアプリケーション付属のwidgetsChars.pngが使われます)
- widgetsChars.json(ない場合はアプリケーション付属のwidgetsChars.jsonが使われます)

ただし上記画像が全てなくても`widgets.png`さえあればホットバーに文字を追加することは可能です。
