const express = require("express");

const app = express();

app.get("/", (req, res) => {
    console.log("req res on '/' (GET)");
    res.json({
        isSuccess: true,
        message: "Server (GET) is running fine...",
        data: {},
    });
});

app.post("/", (req, res) => {
    console.log("req res on '/' (POST)");
    res.json({
        isSuccess: true,
        message: "Server (POST) is running fine...",
        data: {},
    });
});

app.listen(2900, () => {
    console.log("---------=== Server Started ===---------");
});
