const express = require("express");
const { productRouter } = require("./products/routes");
const apiRouter = express.Router();

apiRouter.use("/products", productRouter);

module.exports = { apiRouter };
