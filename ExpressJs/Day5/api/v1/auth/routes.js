const express = require("express");
const { userSignupController, userLoginController, userLogoutController } = require("./controllers");
const { userSignupValidator, userLoginValidator } = require("./dto");
const { validateOtpMiddleware } = require("../otps/middlewares");

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidator, validateOtpMiddleware, userSignupController);
authRouter.post("/login", userLoginValidator, userLoginController);
authRouter.get("/logout", userLogoutController);

module.exports = { authRouter };
