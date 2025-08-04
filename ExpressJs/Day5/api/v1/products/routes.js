const express = require("express");

const {
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
    listProductsControllers,
    viewProductController,
} = require("./controllers");

const {
    validateViewProduct,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
} = require("./dto");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const productRouter = express.Router();

// productRouter.use(validateLoggedInUserMiddleware); // router level middleware
// secured APIs

productRouter.get("/", listProductsControllers);
productRouter.get("/all", validateLoggedInUserMiddleware, getAllProductsController);

// ------ admin functionality
productRouter.post("/", validateLoggedInUserMiddleware, createProductValidator, createProductController);
// productRouter.post("/bulk-create", createBulkProductsValidator, createBulkProductsController);
productRouter.patch("/:productId", validateLoggedInUserMiddleware, updateProductValidator, updateProductController);
productRouter.delete("/:productId", validateLoggedInUserMiddleware, deleteProductValidator, deleteProductController);
productRouter.get("/view/:productId", validateViewProduct, viewProductController);

module.exports = { productRouter };
