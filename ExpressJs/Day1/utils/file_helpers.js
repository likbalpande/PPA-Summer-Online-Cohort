const fsPromises = require("fs/promises");

const myReadFile = async (filePath) => {
    try {
        const data = await fsPromises.readFile(filePath, "utf-8");
        return JSON.parse(data); // JSON (str) ===> JS Object
    } catch (err) {
        console.log("Error reading the file -->", err.message);
        return [];
    }
};

const mySaveFile = async (filePath, data) => {
    try {
        const str = JSON.stringify(data, null, 4); // JS Object ===> JSON (str)
        await fsPromises.writeFile(filePath, str);
    } catch (err) {
        console.log("Error saving the file -->", err.message);
        return [];
    }
};

module.exports = { myReadFile, mySaveFile };
