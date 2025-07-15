const express = require("express"); // require --> internal module, is it user defined, node_module
const { myReadFile, mySaveFile } = require("./utils/file_helpers");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const FILE_PATH = "./products.json";
const ORDERS_FILE_PATH = "./orders.json";

app.use((req, res, next) => {
    console.log("-->", new Date(), req.method, req.url);
    next();
}); // middleware

app.get("/api/v1/products", async (req, res) => {
    const productsArr = await myReadFile(FILE_PATH);
    res.json({
        isSuccess: true,
        message: "Products fetched!",
        data: {
            products: productsArr,
        },
    });
});

app.post("/api/v1/products", async (req, res) => {
    const data = req.body;
    data.id = uuidv4();
    const oldArr = await myReadFile(FILE_PATH);
    oldArr.push(data);
    await mySaveFile(FILE_PATH, oldArr);

    res.status(201);
    res.json({
        isSuccess: true,
        message: "Product created",
    });
});

// dynamic route
app.patch("/api/v1/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const data = req.body;
    // get old array
    const products = await myReadFile(FILE_PATH);
    // find if there is any product with that given id
    // (array search method) findIndex
    const idx = products.findIndex((elem) => {
        return elem.id === productId;
    });
    if (idx === -1) {
        res.status(400);
        res.json({
            isSuccess: false,
            message: "Invalid product id",
        });
        return;
    }
    // change the old object to replace its properties
    // updated object --> save it in array
    const oldObj = products[idx];
    products[idx] = { ...oldObj, ...data };
    // update array --> save it in file
    mySaveFile(FILE_PATH, products);

    res.status(200);
    res.json({
        isSuccess: true,
        message: "Product updated",
        data: {
            product: products[idx],
        },
    });
});

app.delete("/api/v1/products/:productId", async (req, res) => {
    const { productId } = req.params;
    // get old array
    const products = await myReadFile("./data.json");
    // find if there is any product with that given id
    // (array search method) findIndex
    const idx = products.findIndex((elem) => {
        return elem.id === productId;
    });
    if (idx === -1) {
        res.status(400);
        res.json({
            isSuccess: false,
            message: "Invalid product id",
        });
        return;
    }
    // change the old object to replace its properties
    // updated object --> save it in array
    products.splice(idx, 1);

    // update array --> save it in file
    mySaveFile(FILE_PATH, products);

    res.status(204);
    res.json({
        isSuccess: true,
        message: "Product updated",
        data: {},
    });
});

app.post("/api/v1/orders", async (req, res) => {
    const data = req.body;
    const { productId } = data;
    const products = await myReadFile(FILE_PATH);
    const idx = products.findIndex((elem) => {
        return elem.id === productId;
    });
    if (idx === -1) {
        res.status(400);
        res.json({
            isSuccess: false,
            message: "Invalid product id",
        });
        return;
    }
    const oldObj = products[idx];
    const oldQuantity = products[idx].quantity;
    if (oldQuantity <= 0) {
        res.status(500);
        res.json({
            isSuccess: false,
            message: "Product is out of stock!",
        });
        return;
    }
    // reducing the quantity by one since someone bought that product
    products[idx] = { ...oldObj, quantity: oldQuantity - 1 };
    mySaveFile(FILE_PATH, products);

    //to create a order
    const orders = await myReadFile(ORDERS_FILE_PATH);
    orders.push({ id: uuidv4(), productId: productId });
    mySaveFile(ORDERS_FILE_PATH, orders);

    res.status(201);
    res.json({
        isSuccess: true,
        message: "Order created",
    });
});

app.listen(3900, () => {
    console.log("---------- Server started -----------");
});
