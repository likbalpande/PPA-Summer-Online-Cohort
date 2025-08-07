const express = require("express");
const { validateIsAdminMiddleware, validateLoggedInUserMiddleware } = require("../middlewares");
const { sendAdminInfoController } = require("./controllers");

const adminRouter = express.Router();

adminRouter.get("/me", validateLoggedInUserMiddleware, validateIsAdminMiddleware, sendAdminInfoController);

module.exports = { adminRouter };
