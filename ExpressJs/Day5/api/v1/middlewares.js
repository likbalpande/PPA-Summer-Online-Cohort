const jwt = require("jsonwebtoken");

const validateLoggedInUserMiddleware = (req, res, next) => {
    try {
        console.log("------- inside validateLoggedInUserMiddleware ------");

        const { authorization } = req.cookies;

        if (!authorization) {
            console.log("🟠 Token not present !!!");
            res.status(401).json({
                isSuccess: false,
                message: "User not logged in!",
            });
            return;
        }

        jwt.verify(authorization, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log("🔴 Invalid token... may be hacking attempt!");

                res.status(401).json({
                    isSuccess: false,
                    message: "User not logged in!",
                });
                return;
            } else {
                console.log("✅ Valid user", data);
                req.currentUser = data;
                next();
            }
        });
    } catch (err) {
        console.log("------- 🔴 Error in validateLoggedInUserMiddleware --------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { validateLoggedInUserMiddleware };
