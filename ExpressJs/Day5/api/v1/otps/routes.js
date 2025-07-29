const express = require("express");
const { sendOtpController } = require("./controllers");

const otpRouter = express.Router();

otpRouter.post("/", sendOtpController);

module.exports = { otpRouter };
