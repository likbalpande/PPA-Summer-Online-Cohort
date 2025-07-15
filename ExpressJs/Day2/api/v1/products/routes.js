const express = require("express");
const { createProductController, getProductsController } = require("./controllers");
const { validateProductForCreation } = require("./dto");

const productsRouter = express.Router();

// GET "/api/v1/products"
productsRouter.get("/", getProductsController);

// POST "/api/v1/products"
productsRouter.post("/", validateProductForCreation, createProductController); // middleware chaining

// // PATCH "/api/v1/products/:productId"
// productsRouter.patch("/:productId", validateEditProduct, editProductController);

// // DELETE "/api/v1/products/:productId"
// productsRouter.delete("/:productId", validateDeleteProduct, deleteProductController);

module.exports = { productsRouter };
