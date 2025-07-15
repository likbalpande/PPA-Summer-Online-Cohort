const { v4: uuidv4 } = require("uuid");
const { myReadFile, mySaveFile } = require("../utils/fileHelpers");

const PRODUCTS_FILE_PATH = "./models/products.json";

const saveProduct = async (data) => {
    const products = await myReadFile(PRODUCTS_FILE_PATH);

    const idx = products.findIndex((elem) => {
        if (elem.title === data.title) {
            return true;
        } else return false;
    });

    if (idx !== -1) {
        throw new Error("Product with given title already exists!");
    }

    data.id = uuidv4();
    products.push(data);
    await mySaveFile(PRODUCTS_FILE_PATH, products);
};

const readProducts = async () => {
    const products = await myReadFile(PRODUCTS_FILE_PATH);
    return products;
};

// editProduct

// deleteProduct

module.exports = { saveProduct, readProducts };
