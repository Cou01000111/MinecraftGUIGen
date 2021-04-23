'use strict';
global.HOTBAR_COUNT = 10;
const fs = require("fs");
const sharp = require("sharp");
const lf = require("./lf");

function convertProcess(basePath, charsPath, keyOption) {
    if (argsAsProblemExits(basePath, charsPath, keyOption)) {

    }
}

//chars画像,base画像,key optionそれぞれ問題がないか
function argsAsProblemExits(basePath, charsPath, keyOption) {
    return (charsAsProblemExists(charsPath) == false && baseAsProblemExits(basePath) == false && keyOption.length() == 10);
}

//chars画像が加工をする上で問題がないか
function charsAsProblemExists(charsPath) {
    const chars = sharp(charsPath);

    const {
        format: charsFormat,
        width: charsWidth,
        height: charsHeight
    } = chars.metadata();
    /*
    今のところ以下の条件のみ
    - png
    - widthが32
    - heightが36
    */
    return (charsFormat == 'png' && charsWidth == 32 && charsHeight == 36)
}

//base画像が加工をする上で問題がないか
function baseAsProblemExits(basePath) {
    const base = sharp(charsPath);

    const {
        format: baseFormat,
        width: baseWidth,
        height: baseHeight
    } = base.metadata();
    /*
    今のところ以下の条件のみ
    - png
    - widthが256
    - heightが256
    */
    return (baseFormat == 'png' && baseWidth == 256 && baseHeight == 256)
}

//chars画像をoptionに基づいて10個の6*5の画像に切り出し、配列として返す
function convertChars(path, option) {
    var option;
    var chars = sharp(path);
    var hotbarList = new Array();
    for (let count = 0; count < global.HOTBAR_COUNT; count++) {
        hotbarList.push(option);
    }
}

function getCharsObjList(char, charsPath) {
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
