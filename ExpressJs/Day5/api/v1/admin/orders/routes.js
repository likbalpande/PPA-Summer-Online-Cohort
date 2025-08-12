const express = require("express");
const { getAllOrdersForAdminController } = require("./controllers");

const adminOrdersRouter = express.Router();

adminOrdersRouter.get("/", getAllOrdersForAdminController);

module.exports = { adminOrdersRouter };
