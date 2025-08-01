const express = require("express");
const { sendUserInfoController } = require("./controllers");
const { validateLoggedInUserMiddleware } = require("../middlewares");

const usersRouter = express.Router();

usersRouter.get("/me", validateLoggedInUserMiddleware, sendUserInfoController);

module.exports = { usersRouter };
