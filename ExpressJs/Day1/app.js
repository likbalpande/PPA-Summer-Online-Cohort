const express = require("express"); // require --> internal module, is it user defined, node_module
const { myReadFile, mySaveFile } = require("./utils/file_helpers");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("-->", new Date(), req.method, req.url);
    next();
}); // middleware

app.get("/api/v1/products", async (req, res) => {
    const productsArr = await myReadFile("./data.json");
    res.json({
        isSuccess: true,
        message: "(GET) working...",
        data: {
            products: productsArr,
        },
    });
});

app.post("/api/v1/products", async (req, res) => {
    const data = req.body;
    console.log(data);
    const oldArr = await myReadFile("./data.json");
    oldArr.push(data);
    await mySaveFile("./data.json", oldArr);

    res.status(201);
    res.json({
        isSuccess: true,
        message: "Product created",
    });
});

app.listen(3900, () => {
    console.log("---------- Server started -----------");
});
