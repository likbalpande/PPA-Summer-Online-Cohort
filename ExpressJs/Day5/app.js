require("dotenv").config();
require("./config/db");

const cron = require("node-cron");
const express = require("express");
const morgan = require("morgan");
const { apiRouter } = require("./api/v1/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { checkForAbandonedOrdersCronJob } = require("./api/v1/orders/controller");

const PORT = process.env.PORT || 3900;

const app = express();

// app.use(cors()); // ** it will allow all the origins to talk to the backend (good for development but bad for production)

app.use(
    cors({
        origin: process.env.FRONTEND_URL, // put here frontend url that you want to allow
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);

app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 2000);
});

// rate limiter

app.use(morgan("dev"));

app.use(express.json()); // body-parser in json format

app.use(cookieParser()); // body-parser in json format

app.get("/", (req, res) => {
    res.send("<h1>Server is running ...</h1>");
});

app.use("/api/v1", apiRouter);

cron.schedule("*/15 * * * * *", () => {
    // console.log("* * * running a task every fifteen seconds * * *");

    checkForAbandonedOrdersCronJob();
});

app.listen(PORT, () => {
    console.log("--------- Server Started ----------");
});
