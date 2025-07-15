const express = require("express");

const ordersRouter = express.Router();

ordersRouter.get("/", (req, res) => {
    res.status(200).send("(GET) Dummy orders endpoint!");
});
ordersRouter.post("/", (req, res) => {
    res.status(200).send("(POST) Dummy orders endpoint!");
});
ordersRouter.patch("/", (req, res) => {
    res.status(200).send("(PATCH) Dummy orders endpoint!");
});
ordersRouter.delete("/", (req, res) => {
    res.status(200).send("(DELETE) Dummy orders endpoint!");
});

module.exports = { ordersRouter };
