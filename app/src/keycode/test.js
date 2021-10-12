var data112 = require("./keycode1.12.2.json");
var data113 = require("./keycode1.13.json");
console.log("-1.12.2-");

console.log(
  data112
    .map((datum) => datum[1])
    .filter((datum) => !(data113.map((datum) => datum[1]).includes(datum)))
);
console.log("-1.13-");
console.log(
  data113
    .map((datum) => datum[1])
    .filter((datum) => !(data112.map((datum) => datum[1]).includes(datum)))
);
