const express = require("express");
const { updateProductController } = require("./controllers");
const { updateProductValidator } = require("./dto");

const adminProductsRouter = express.Router();

adminProductsRouter.patch("/:productId", updateProductValidator, updateProductController);

module.exports = { adminProductsRouter };
