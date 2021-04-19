'use strict';


function imageProcess(basePath, charaPath) {
    const sharp = require('sharp');
    var charaPath = "..\\img\\widgetsChara.png"
    var basePath;
    if (charaAsProblemExists(charaPath) == false) {
        (async () => {
            const chara = await sharp(charaPath);

            const {
                width: charaWidth,
                height: charaHeight
            } = await chara.metadata()

            const n = Math.ceil(baseHeight / baseWidth)

            for (let i = 0; i < n; i++) {
                const top = baseWidth * i
                const height = Math.min(baseHeight - top, baseWidth)

                await base.clone().extract({
                    left: 0,
                    top,
                    width: baseWidth,
                    height
                }).toFile(`output/image-${i + 1}.png`)
            }
        })()
    }
}

//chara画像が加工をする上で問題がないか
function charaAsProblemExists(charaPath) {
    const chara = await sharp(charaPath);

    const {
        width: charaWidth,
        height: charaHeight
    } = await CHARA.metadata();
    /*
    今のところ以下の条件のみ
    - widthが32
    - heightが36
    */
    return (charaWidth == 32 && charaHeight == 36)
}

module.exports
