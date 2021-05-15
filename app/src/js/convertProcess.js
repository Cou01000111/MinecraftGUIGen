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
//なぜかtestingargsの返り値にPromiseがつくので適当にasync
async function convertProcess(basePath, charsPath, charsJson, keyOption, outputPath) {
    resetConvertMessage();
    var test = await testingArgs(basePath, charsPath, charsJson, keyOption);
    console.log(`testingArgs:${test} in convert process`);
    if (test == false) {
        console.log('引数に問題がありました');
        return;
    }
    console.log('引数に問題がありませんでした');
    var options = keyOption.split(',');
    makeCharPng(options, charsPath, charsJson);
    var base = sharp(basePath);
    //images作成
    var chars = new Array();
    for (let i = 0; i < HOTBAR_COUNT; i++) {
        var path = `./src/img/${i}.png`
        var compositeObj = {
            "input": path,
            "top": 1 * IMAGE_MAGNIFICATION,
            "left": 1 + i * HOTBAR_WIDTH * IMAGE_MAGNIFICATION
        };
        //console.log(compositeObj);
        chars.push(compositeObj);
    }
    //console.log(chars);
    base.composite(chars).toFile(outputPath, (err, info) => {
        if (err) console.log(err);
        else $('#convertMessage').text('ファイル出力成功');
        console.log(info);
    });
}

//chars画像,base画像,key optionそれぞれ問題がないか
//問題なし:true
//なぜかtestingCharsPath,testingBasePathでPromiseが返されるので適当にasync
async function testingArgs(basePath, charsPath, charsJson, keyOption) {
    console.log(`basePath:${basePath}`);
    console.log(`charsPath:${charsPath}`);
    console.log(`charsJson:${charsJson}`);
    console.log(keyOption);
    var charsPathTest = await testingCharsPath(charsPath);
    var basePathTest = await testingBasePath(basePath);
    var jsonPathTest = testingJsonPath(charsJson);
    var keyOptionTest = (keyOption.split(',').length == HOTBAR_COUNT);
    var ans = (charsPathTest && basePathTest && jsonPathTest && keyOptionTest);
    //console.log(charsPathTest);
    //console.log(basePathTest);
    //console.log(jsonPathTest);
    console.log(keyOptionTest);
    console.log(keyOption.split(',').length);
    console.log(`testingArgs:${ans}`);
    return (ans);
}

//chars画像が加工をする上で問題がないか
//問題なし:true
async function testingCharsPath(charsPath) {
    if (charsPath == '') {
        emptyPath('chars');
    } else if (!fs.existsSync(charsPath)) {
        invalidPath('chars');
    } else {
        const chars = sharp(charsPath);
        const {
            format: charsFormat,
            width: charsWidth,
            height: charsHeight
        } = await chars.metadata();
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
        console.log(charsWidth);
        console.log(charsHeight);
        if (isPng && isWidth256NTimes && isHeight256NTimes && widthWithHeightSameIs) {
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < charsWidth / CHARS_STANDARD_WIDTH) ? IMAGE_MAGNIFICATION : charsWidth / CHARS_STANDARD_WIDTH;
            return true;
        } else {
            var conditions = [isPng,isWidth256NTimes,isHeight256NTimes,widthWithHeightSameIs];
            selectedRightnessNotImage('chars',conditions);
        }
    }
    return false;
}

//base画像が加工をする上で問題がないか
//問題なし:true
async function  testingBasePath(basePath) {
    if(basePath == ''){
        emptyPath('base');
    } else if (!fs.existsSync(basePath)) {
        invalidPath('base');
    } else {
        const base = await sharp(basePath);
        const {
            format: baseFormat,
            width: baseWidth,
            height: baseHeight
        } = await base.metadata();
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
        console.log(baseWidth);
        console.log(baseHeight);
        console.log(base);
        if (isPng && isWidth256NTimes && isHeight256NTimes && widthWithHeightSameIs) {
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < baseWidth / BASE_STANDARD_WIDTH) ? IMAGE_MAGNIFICATION : baseWidth / BASE_STANDARD_WIDTH;
            return true;
        } else {
            var conditions = [isPng,isWidth256NTimes,isHeight256NTimes,widthWithHeightSameIs];
            selectedRightnessNotImage('base',conditions);
        }
    }
    return false;
}

//chars jsonが加工をする上で問題ないか
function testingJsonPath(jsonPath) {
    if(jsonPath == ''){
        emptyPath('json');
        return false;
    }
    if (!fs.existsSync(jsonPath)) {
        invalidPath('json');
        return false;
    }
    var json = fs.readFileSync(jsonPath);
    if (isValidJson(json) == false) {
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
        sharp(path).extract(ex).png().toFile(`./src/img/${i}.png`, () => { resolve() });
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
