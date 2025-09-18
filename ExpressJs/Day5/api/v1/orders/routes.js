const express = require("express");
const { placeOrderController, getPaymentStatusController, getAllOrdersForClientController } = require("./controller");
const { placeOrderValidator, paymentStatusValidator } = require("./dto");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const ordersRouter = express.Router();

ordersRouter.post("/", validateLoggedInUserMiddleware, placeOrderValidator, placeOrderController);

ordersRouter.get("/", validateLoggedInUserMiddleware, getAllOrdersForClientController);

ordersRouter.get(
    "/:orderId/payment-status",
    validateLoggedInUserMiddleware,
    paymentStatusValidator,
    getPaymentStatusController
);

module.exports = { ordersRouter };
