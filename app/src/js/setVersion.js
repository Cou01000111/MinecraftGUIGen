"use strict";
const $ = require("jquery");
const packageJson = require("../package.json");
const version = packageJson.version;
$("title").text(`Minecraft Widgets Gen v${version}`);
