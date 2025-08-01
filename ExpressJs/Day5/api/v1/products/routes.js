const express = require("express");

const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    listProductsControllers,
} = require("./controllers");

const { createProductValidator, updateProductValidator, deleteProductValidator } = require("./dto");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const productRouter = express.Router();

productRouter.use(validateLoggedInUserMiddleware); // router level middleware
// secured APIs

productRouter.get("/", listProductsControllers);
productRouter.get("/all", getAllProductsController);

// ------ admin functionality
productRouter.post("/", createProductValidator, createProductController);
// productRouter.post("/bulk-create", createBulkProductsValidator, createBulkProductsController);
productRouter.patch("/:productId", updateProductValidator, updateProductController);
productRouter.delete("/:productId", deleteProductValidator, deleteProductController);

module.exports = { productRouter };
