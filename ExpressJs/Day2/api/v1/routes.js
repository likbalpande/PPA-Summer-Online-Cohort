const express = require("express");
const { productsRouter } = require("./products/routes");
const { ordersRouter } = require("./orders/routes");

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    console.log("--> Api Router invoked!");
    next();
}); // router level middleware

// "/api/v1/orders" --> middleware
apiRouter.use("/orders", ordersRouter);

// "/api/v1/products" --> middleware
apiRouter.use("/products", productsRouter);

module.exports = { apiRouter };
