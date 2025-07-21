const express = require("express");

const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
} = require("./controllers");

const { createProductValidator, updateProductValidator, deleteProductValidator } = require("./dto");

const productRouter = express.Router();

productRouter.get("/", getAllProductsController);
productRouter.post("/", createProductValidator, createProductController);
productRouter.patch("/:productId", updateProductValidator, updateProductController);
productRouter.delete("/:productId", deleteProductValidator, deleteProductController);

module.exports = { productRouter };
