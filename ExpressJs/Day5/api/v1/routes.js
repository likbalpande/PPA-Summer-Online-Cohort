const express = require("express");
const { productRouter } = require("./products/routes");
const { authRouter } = require("./auth/routes");
const { otpRouter } = require("./otps/routes");
const { usersRouter } = require("./users/routes");
const { cartRouter } = require("./cart/routes");
const apiRouter = express.Router();

apiRouter.use("/products", productRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/otps", otpRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/cart", cartRouter);

module.exports = { apiRouter };
