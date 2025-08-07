const express = require("express");
const { updateItemInCartValidator } = require("./dto");
const { addItemToCartController, getCartItemsController, removeItemFromCartController } = require("./controller");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const cartRouter = express.Router();

cartRouter.get("/", validateLoggedInUserMiddleware, getCartItemsController);

cartRouter.post("/:productId/add", validateLoggedInUserMiddleware, updateItemInCartValidator, addItemToCartController);
cartRouter.post(
    "/:productId/remove",
    validateLoggedInUserMiddleware,
    updateItemInCartValidator,
    removeItemFromCartController
);

module.exports = { cartRouter };
