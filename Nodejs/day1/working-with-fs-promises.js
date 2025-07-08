const fsPromises = require("fs/promises");

console.log("START");
// function declaration --> function abcd(){}
// (named) function assignment --> const xyz = function abcd(){}
// (anonymous) function assignment --> const xyz = function (){}
// (arrow) function assignment --> const xyz =  ()=>{}
// IIFE

const main = async () => {
    const data = await fsPromises.readFile("./my-file.txt", "utf-8");
    console.log(data);
};
main();

// (async () => {
//     const data = await fsPromises.readFile("./my-file.txt", "utf-8");
//     console.log(data);
// })();

console.log("END");
