const express = require("express");
const { userSignupController } = require("./controllers");
const { userSignupValidator } = require("./dto");
const { validateOtpMiddleware } = require("../otps/middlewares");

const authRouter = express.Router();

authRouter.post("/signup", userSignupValidator, validateOtpMiddleware, userSignupController);

module.exports = { authRouter };
