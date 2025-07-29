const userSignupValidator = (req, res, next) => {
    try {
        console.log("------- inside userSignupValidator --------");
        const { email, otp, password } = req.body;

        if (!email || !otp || !password) {
            res.status(400).json({
                isSuccess: false,
                message: "Email, otp and password are required!",
            });
            return;
        }

        //TODO: valid email using regex
        //TODO: valid password (at least 8 chars ...)

        next();
    } catch (err) {
        console.log("------- 🔴 Error in userSignupValidator --------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { userSignupValidator };
