// fs.writeFileSync("./my-file.json", '{"hello":"world"}');
// synchronous

const fs = require("fs");
const { performance } = require("perf_hooks");

// const ans = 12134 * 1781;

const startTime = performance.now();
console.log("start");
const endTime = performance.now();
console.log(endTime - startTime);

const startTime2 = performance.now();
const res = fs.readFileSync("./my-file.txt", "utf-8");
const endTime2 = performance.now();
console.log(endTime2 - startTime2);
console.log("🟡 : res:", res);

console.log("end");
