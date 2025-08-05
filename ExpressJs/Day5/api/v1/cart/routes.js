const express = require("express");
const { addItemToCartValidator } = require("./dto");
const { addItemToCartController, getCartItemsController } = require("./controller");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const cartRouter = express.Router();

cartRouter.get("/", validateLoggedInUserMiddleware, getCartItemsController);

cartRouter.post("/:productId", validateLoggedInUserMiddleware, addItemToCartValidator, addItemToCartController);

module.exports = { cartRouter };
