# ファイル条件
## widgetsBase.png or widgets.png
- pngである
- widthが256のm倍
- heightが256のm倍
- width = height
## widgetsChars.png
- pngである
- jsonのunit.width*nの横幅を持つ
- jsonのunit.height*nの縦幅を持つ
## widgetsChars.json
以下のjsonの形式を持つ
- jsonである
- unitをもつ
  - unit.widthをもつ
  - unit.widthが1以上20以下
  - unit.heightをもつ
  - unit.heightが1以上20以下
- support_key_listをもつ
  - 対応キーが一つ以上ある
```json
{
    "unit":{
        "width":number,
        "height":number
    },
    "support_key_list":{
        "対応キー名":{
            "top":その画像のwidgetsChars.png内の位置,
            "left":その画像のwidgetsChars.png内の位置
        }
    }...
}
```
