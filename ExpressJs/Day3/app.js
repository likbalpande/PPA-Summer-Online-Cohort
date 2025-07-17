const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb+srv://mern-developer-1:password123a@cluster0.ychunlm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("------ Database connected! ---------");
    })
    .catch((err) => {
        console.log("------ Database connection error ---------");
        console.log(err.message);
        console.log("------ ------------------------- ---------");
    });
