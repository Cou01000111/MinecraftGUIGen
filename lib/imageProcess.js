'use strict';
const HOTBAR_COUNT = 10;
const sharp = require("sharp");

function convertProcess(basePath, charaPath, keyOption) {
    if (argsAsProblemExits(basePath, charaPath, keyOption)) {

    }
}

//chara画像,base画像,key optionそれぞれ問題がないか
function argsAsProblemExits(basePath, charaPath, keyOption) {
    return (charaAsProblemExists(charaPath) == false && baseAsProblemExits(basePath) == false && keyOption.length() == 10);
}

//chara画像が加工をする上で問題がないか
function charaAsProblemExists(charaPath) {
    const chara = await sharp(charaPath);

    const {
        format: charaFormat,
        width: charaWidth,
        height: charaHeight
    } = await chara.metadata();
    /*
    今のところ以下の条件のみ
    - png
    - widthが32
    - heightが36
    */
    return (charaFormat == 'png' && charaWidth == 32 && charaHeight == 36)
}

//base画像が加工をする上で問題がないか
function baseAsProblemExits(basePath) {
    const base = await sharp(charaPath);

    const {
        format: baseFormat,
        width: baseWidth,
        height: baseHeight
    } = await base.metadata();
    /*
    今のところ以下の条件のみ
    - png
    - widthが256
    - heightが256
    */
    return (baseFormat == 'png' && baseWidth == 256 && baseHeight == 256)
}

//chara画像をoptionに基づいて10個の6*5の画像に切り出し、配列として返す
function convertChara(path, option) {
    var chara = sharp(path);
    var hotbarList = new Array();
    for (let count = 0; count < HOTBAR_COUNT; count++) {
        hotbarList = chara;
    }
}

function getSharpObjFromChara(chara)

module.exports = convertProcess;
