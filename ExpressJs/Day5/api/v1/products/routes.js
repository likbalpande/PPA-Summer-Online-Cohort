const express = require("express");
const { createProductController, getAllProductsController } = require("./controllers");
const { createProductValidator } = require("./dto");
const productRouter = express.Router();

productRouter.get("/", getAllProductsController);
productRouter.post("/", createProductValidator, createProductController);

module.exports = { productRouter };
