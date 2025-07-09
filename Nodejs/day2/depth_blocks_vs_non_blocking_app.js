// const os = require("os");
// const { pbkdf2Sync } = require("crypto");
// const { performance } = require("perf_hooks");

// const CPU_COUNT = os.cpus().length;
// const ITERATIONS = 20;
// let totalTime = 0;
// let minTime = Number.MAX_SAFE_INTEGER;
// let maxTime = 0;

// const startTime = performance.now();

// for (let i = 0; i < ITERATIONS; i++) {
//     const hash = pbkdf2Sync("likhilesh_balpande", "heavy-security-asd", 1555555, 10, "sha512");
//     console.log(hash.toString("hex"));
//     const endTime = performance.now();
//     const currentTimeDiff = endTime - startTime;
//     totalTime += currentTimeDiff;
//     minTime = Math.min(minTime, currentTimeDiff);
//     maxTime = Math.max(maxTime, currentTimeDiff);
// }

// console.log("Iterations", ITERATIONS);
// console.log("Minimum Time ~", minTime, "s");
// console.log("Maximum Time ~", maxTime, "s");
// console.log("Average Time ~", totalTime / ITERATIONS, "s");

// ----------------------------------------------------

const os = require("os");
const { pbkdf2 } = require("crypto");
const { performance } = require("perf_hooks");

const CPU_COUNT = os.cpus().length;
const ITERATIONS = 20;
let totalTime = 0;
let minTime = Number.MAX_SAFE_INTEGER;
let maxTime = 0;

process.env.UV_THREADPOOL_SIZE = 12;

const startTime = performance.now();

for (let i = 0; i < ITERATIONS; i++) {
    pbkdf2("likhilesh_balpande", "heavy-security-asd", 1555555, 10, "sha512", (err, hash) => {
        // console.log(hash.toString("hex"));
        const endTime = performance.now();
        const currentTimeDiff = endTime - startTime;
        // console.log("🟡 : currentTimeDiff:", currentTimeDiff);
        totalTime += currentTimeDiff;
        minTime = Math.min(minTime, currentTimeDiff);
        maxTime = Math.max(maxTime, currentTimeDiff);
    });
}

setTimeout(() => {
    console.log("==>", process.env.UV_THREADPOOL_SIZE, "/", CPU_COUNT);
    console.log("Minimum Time ~", minTime, "s");
    console.log("Maximum Time ~", maxTime, "s");
    console.log("Average Time ~", totalTime / ITERATIONS, "s");
}, 10000);
