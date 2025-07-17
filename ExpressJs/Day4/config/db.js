const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_DB_URL, {
        dbName: "day-4-express",
    })
    .then(() => {
        console.log("------- DB Connected ---------");
    })
    .catch((err) => {
        console.log("------- DB Connection error ---------");
        console.log(err.message);
        console.log("------- ------------------- ---------");
    });
