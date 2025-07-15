const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");

const app = express();

app.use(morgan("dev")); // app level middleware

app.get("/", (req, res) => {
    res.status(200).json({
        isSuccess: true,
        message: "Server is working fine...",
    });
}); // "/" GET

// middleware "/api/v1"
app.use("/api/v1", apiRouter);

app.listen(3900, () => {
    console.log("-------- Server Started ---------");
});
