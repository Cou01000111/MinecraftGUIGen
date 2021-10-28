# テストケース

1. THG対応リソースパックが加工できる
2. THG非対応リソースパックがが加工でき、以下警告を出す
   1. widgetsBase.pngが見つかりませんでした。widgets.pngを代わりに使用します
   2. widgetsChars.pngが見つかりませんでした。App付属のwidgetsChars.pngを使用します
   3. chars.jsonが見つかりませんでした。App付属のchars.jsonを使用します
3. リソースパック以外のディレクトリ選択時にエラーを出す
4. widgets.pngとwidgetsBase.pngがないリソースパック選択時はエラーを吐く
5. THG非対応リソースパックがが加工でき、非対応ショートカットキーが選択されていた場合そこは空白として出力する
