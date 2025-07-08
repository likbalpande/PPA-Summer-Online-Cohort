const fs = require("node:fs");

console.log("start");

const startTime2 = performance.now();

fs.readFile("./my-file.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Cannot read file -->", err.message);
    } else {
        console.log("Data --> ", data);
    }
});

const endTime2 = performance.now();
console.log(endTime2 - startTime2);

console.log("end");
