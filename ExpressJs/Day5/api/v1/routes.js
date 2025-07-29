const express = require("express");
const { productRouter } = require("./products/routes");
const { authRouter } = require("./auth/routes");
const { otpRouter } = require("./otps/routes");
const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/otps", otpRouter);

module.exports = { apiRouter };
