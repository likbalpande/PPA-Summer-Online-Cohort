const { UserModel } = require("../../../models/userSchema");

const userSignupController = async (req, res) => {
    try {
        console.log("------- inside userSignupController ------");

        const { email, password } = req.body;

        // how will you verify that the email that is entered by the user actually belongs to the user?

        // verification --> OTP verification

        const newUser = await UserModel.create({
            email,
            password,
        });

        res.status(201).json({
            isSuccess: true,
            message: "User Created!",
            data: {
                user: {
                    email: newUser.email,
                    _id: newUser._id,
                },
            },
        });

        // we need to create the user
    } catch (err) {
        console.log("------- 🔴 Error in userSignupController --------", err.message);

        if (err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: "User account already exists!",
                data: {},
            });
            return;
        } else if (err.name === "ValidationError") {
            res.status(400).json({
                isSuccess: false,
                message: err.message,
                data: {},
            });
            return;
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { userSignupController };
