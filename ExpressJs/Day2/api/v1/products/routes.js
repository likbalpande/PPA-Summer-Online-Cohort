const express = require("express");

const productsRouter = express.Router();

// GET "/api/v1/products"
productsRouter.get("/", (req, res) => {
    res.status(200).send("(GET) Dummy products endpoint!");
});

// POST "/api/v1/products"
productsRouter.post("/", (req, res) => {
    res.status(200).send("(POST) Dummy products endpoint!");
});

// PATCH "/api/v1/products/:productId"
productsRouter.patch("/:productId", (req, res) => {
    res.status(200).send("(PATCH) Dummy products endpoint!");
});

// DELETE "/api/v1/products/:productId"
productsRouter.delete("/:productId", (req, res) => {
    res.status(200).send("(DELETE) Dummy products endpoint!");
});

module.exports = { productsRouter };
