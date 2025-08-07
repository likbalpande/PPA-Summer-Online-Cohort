const express = require("express");
const { placeOrderController } = require("./controller");
const { placeOrderValidator } = require("./dto");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const ordersRouter = express.Router();

ordersRouter.post("/", validateLoggedInUserMiddleware, placeOrderValidator, placeOrderController);

module.exports = { ordersRouter };
