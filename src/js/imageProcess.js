'use strict';
const HOTBAR_COUNT = 9;
const CHARS_STANDARD_WIDTH = 32;
const CHARS_STANDARD_HEIGHT = 36;
const BASE_STANDARD_WIDTH = 256;
const BASE_STANDARD_HEIGHT = 256;
const fs = require("fs");
const path = require("node:path");
const sharp = require("sharp");
const lf = require("./lf");

var IMAGE_MAGNIFICATION = 1;

$('#convertWidgets').on('click', () => {
    convertProcess($('#widgetsBasePathInput').val(), $('#widgetsBasePathInput').val('#minecraftKeyConfig').text());
})

/**
 * 大まかな流れ
 * argsに問題がないかチェックする
 * IMAGE_MAGNIFICATIONの設定(かくtesting内で設定)
 * key configの画像一覧取得
 * for HOTBAR_COUNT回
 *  option[i]の画像取得
 *  widgetsBaseに合成
 * widgets.png出力
 */
function convertProcess(basePath, charsPath, keyOption) {
    if (testingArgs(basePath, charsPath, keyOption)) {
        return;
    }
    var options = keyOption.split(',');
    var charsObjList = getCharsImageObjList();
    options.forEach(option => {

    });

}

//chars画像,base画像,key optionそれぞれ問題がないか
//問題があった場合=true
function testingArgs(basePath, charsPath, keyOption) {
    return (testingCharsPath(charsPath) == false && testingBasePath(basePath) == false && keyOption.length() == HOTBAR_COUNT);
}

//chars画像が加工をする上で問題がないか
function testingCharsPath(charsPath) {
    if (!path.existsSync(charsPath)) {
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
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < charsWidth / CHARS_STANDARD_WIDTH)?IMAGE_MAGNIFICATION:charsWidth / CHARS_STANDARD_WIDTH;
            return true;
        }
    }
    return false;
}

//base画像が加工をする上で問題がないか
function testingBasePath(basePath) {
    if (!path.existsSync(basePath)) {
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
            IMAGE_MAGNIFICATION = (IMAGE_MAGNIFICATION < baseWidth / BASE_STANDARD_WIDTH)?IMAGE_MAGNIFICATION:baseWidth / BASE_STANDARD_WIDTH;
            return true;
        }
    }
    return false;
}

//chars画像をoptionに基づいて10個の6*5の画像に切り出し、配列として返す
function convertChars(path, option) {
    var chars = sharp(path);
    var hotbarList = new Array();
    for (let count = 0; count < global.HOTBAR_COUNT; count++) {
        hotbarList.push(option);
    }
}

function getCharsImageObjList(char, charsPath) {
    const list = new Array;
    for (let i = 0; i < global.HOTBAR_COUNT; i++) {
        list = getCharsObj(char, charsPath);
    }
    return list
}

function getComposite(char, charsPath) {
    var compositeObj = {
        input: charsPath,
        top: 0,
        left: 0
    };
    switch (char) {
        case 'a':

            break;
        case 'b':

            break;
        case 'c':

            break;
        case 'd':

            break;
        case 'e':

            break;
        case 'f':

            break;
        case 'g':

            break;
        case 'h':

            break;
        case 'i':

            break;
        case 'j':

            break;
        case 'k':

            break;
        case 'l':

            break;
        case 'm':

            break;
        case 'n':

            break;
        case 'o':

            break;
        case 'p':

            break;
        case 'q':

            break;
        case 'r':

            break;
        case 's':

            break;
        case 't':

            break;
        case 'u':

            break;
        case 'v':

            break;
        case 'w':

            break;
        case 'x':

            break;
        case 'y':

            break;
        case 'z':

            break;
        case 'a':

            break;
        case '':

            break;
        case 'a':

            break;
        case 'a':

            break;


        default:
            break;
    }
}

module.exports = convertProcess;
