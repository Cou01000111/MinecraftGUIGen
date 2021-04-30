'use strict';
const HOTBAR_COUNT = 9;
const CHARS_STANDARD_WIDTH = 48;
const CHARS_STANDARD_HEIGHT = 48;
var UNIT_OF_CHAR_WIDTH = 6;
var UNIT_OF_CHAR_HEIGHT = 6;
const HOTBAR_WIDTH = 20;
const BASE_STANDARD_WIDTH = 256;
const BASE_STANDARD_HEIGHT = 256;
const sharp = require("sharp");
var IMAGE_MAGNIFICATION = 1;

$('#convertWidgets').on('click', () => {
    convertProcess(
        $('#widgetsBasePathInput').val(),
        $('#widgetsCharsPathInput').val(),
        $('#widgetsCharsJsonPathInput').val(),
        $('#minecraftKeyConfig').text(),
        $('#outputPathInput').val()
    );
})
//TODO chars.jsonにないものがkey configにあった場合の処理

/**
 * 出力
 */
function convertProcess(basePath, charsPath, charsJson, keyOption, outputPath) {
    if (testingArgs(basePath, charsPath, charsJson, keyOption)) {
        return;
    }
    var options = keyOption.split(',');
    makeCharPng(options, charsPath, charsJson);
    var base = sharp(basePath);
    //images作成
    var chars = new Array();
    for (let i = 0; i < HOTBAR_COUNT; i++) {
        var path = `./img/${i}.png`
        console.log(path);
        console.log(fs.existsSync(path));
        console.log(1 + i * HOTBAR_WIDTH * IMAGE_MAGNIFICATION);
        var compositeObj = {
            "input": path,
            "top": 1 * IMAGE_MAGNIFICATION,
            "left": 1 + i * HOTBAR_WIDTH * IMAGE_MAGNIFICATION
        };
        console.log(compositeObj);
        chars.push(compositeObj);
    }
    console.log(chars);
    base.composite(chars).toFile(outputPath, (err) => {
        if (err) console.log(err);
    });
}

//chars画像,base画像,key optionそれぞれ問題がないか
//問題があった場合=true
function testingArgs(basePath, charsPath, charsJson, keyOption) {
    console.log(basePath);
    console.log(charsPath);
    console.log(charsJson);
    console.log(keyOption);
    return (testingCharsPath(charsPath) == false && testingBasePath(basePath) == false && testingJsonPath(charsJson) && keyOption.length == HOTBAR_COUNT);
}

//chars画像が加工をする上で問題がないか
function testingCharsPath(charsPath) {
    if (!fs.existsSync(charsPath)) {
        console.log(charsPath);
        console.log(!fs.existsSync(charsPath));
        InvalidPath('chars');
        return false;
    } else {
        const chars = sharp(charsPath);
        const {
            format: charsFormat,
            width: charsWidth,
            height: charsHeight
        } = chars.metadata();
        /*
        今のところ以下の条件のみ
        - png
        - widthが32のn倍
        - heightが36のn倍
        */
        var isPng = charsFormat == 'png';
        var isWidth256NTimes = charsWidth % CHARS_STANDARD_WIDTH == 0;
        var isHeight256NTimes = charsHeight % CHARS_STANDARD_HEIGHT == 0;
        var widthWithHeightSameIs = charsWidth == charsHeight;
        if (isPng && isWidth256NTimes && isHeight256NTimes && widthWithHeightSameIs) {
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < charsWidth / CHARS_STANDARD_WIDTH) ? IMAGE_MAGNIFICATION : charsWidth / CHARS_STANDARD_WIDTH;
            return true;
        }
    }
    return false;
}

//base画像が加工をする上で問題がないか
function testingBasePath(basePath) {
    if (!fs.existsSync(basePath)) {
        InvalidPath('base');
        return false;
    } else {
        const base = sharp(basePath);
        const {
            format: baseFormat,
            width: baseWidth,
            height: baseHeight
        } = base.metadata();
        /*
        今のところ以下の条件のみ
        - png
        - widthが256のm倍
        - heightが256のm倍
        - width = height
        */
        var isPng = baseFormat == 'png';
        var isWidth256NTimes = baseWidth % BASE_STANDARD_WIDTH == 0;
        var isHeight256NTimes = baseHeight % BASE_STANDARD_HEIGHT == 0;
        var widthWithHeightSameIs = baseWidth == baseHeight;
        if (isPng && isWidth256NTimes && isHeight256NTimes && widthWithHeightSameIs) {
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < baseWidth / BASE_STANDARD_WIDTH) ? IMAGE_MAGNIFICATION : baseWidth / BASE_STANDARD_WIDTH;
            return true;
        }
    }
    return false;
}

//chars jsonが加工をする上で問題ないか
function testingJsonPath(jsonPath) {
    var json = fs.readFileSync(jsonPath);
    if (!fs.existsSync(jsonPath)) {
        InvalidPath('json');
        return false;
    } else if (isValidJson(json) == false) {
        illegalJSONPassed();
        return false;
    } else {
        /**jsonファイルの条件
         * unitがある
         */
        var jsObj = JSON.parse(json);
        console.log(jsObj);
        UNIT_OF_CHAR_WIDTH = jsObj.unit.width;
        UNIT_OF_CHAR_HEIGHT = jsObj.unit.height;
        var isUnitNormal = hasUnit(jsObj);
        return (isUnitNormal);
    }
}

//jsonObjにunitがあり、それが正しいかどうか
function hasUnit(jsonObj) {
    if (jsonObj.hasOwnProperty('unit') == false) {
        //unitがない
        noUnit();
        return false;
    } else if ((jsonObj.unit.hasOwnProperty('width') && jsonObj.unit.hasOwnProperty('height')) == false) {
        //unitのプロパティがおかしい
        unitPropertyIsIllegal();
        return false;
    }
    return true;
}

//渡された文字列がjsonに変換できるかどうか
function isValidJson(value) {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
}

//hotbarにつかうchar.pngを生成し、連番でimgに保存する
function makeCharPng(keyOptionList, charsPath, jsonPath) {
    var extractList = getExtractList(keyOptionList, jsonPath);
    var i = 0;
    keyOptionList.forEach(async option => {
        var exObj = {
            top: extractList.get(option).top * UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
            left: extractList.get(option).left * UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
            width: UNIT_OF_CHAR_WIDTH * IMAGE_MAGNIFICATION,
            height: UNIT_OF_CHAR_HEIGHT * IMAGE_MAGNIFICATION
        };
        outputImagePromise(charsPath, exObj, i);
        i++;
    });
}

function outputImagePromise(path, ex, i) {
    return new Promise((resolve) => {
        sharp(path).extract(ex).png().toFile(`./img/${i}.png`, () => { resolve() });
    })
}

//{ option: {top: n,left:n} }のリストを返す
//key option list にない場合は{ option: "" }を返す
function getExtractList(keyOptionList, jsonPath) {
    const allExtractObjList = JSON.parse(fs.readFileSync(jsonPath));
    var extract = new Map();
    keyOptionList.forEach(option => {
        //console.log(option);
        //console.log(allExtractObjList[option]);
        //console.log(allExtractObjList.hasOwnProperty(option));
        if (allExtractObjList.hasOwnProperty(option)) {
            //console.log(true);
            extract.set(option, allExtractObjList[option]);
        }
        else {
            //console.log(false);
            extract.set({ option: "" });
        }
    });
    //console.log(extract);
    return extract
}
