const { UserModel } = require("../../../models/userSchema");
const bcrypt = require("bcrypt");

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
            res.status(409).json({
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

const userLoginController = async (req, res) => {
    try {
        console.log("------- inside userLoginController ------");

        const { email, password } = req.body;

        // i will check if any user exists with the given email
        const userDoc = await UserModel.findOne({
            email: email,
        }).lean();

        if (userDoc == null) {
            res.status(400).json({
                isSuccess: false,
                message: "User account doesn't exists! Please signup first...",
            });
            return;
        }

        // i will check if the given password matches the hashed-password of the saved user
        const { password: hashedPassword } = userDoc;
        const isCorrect = await bcrypt.compare(password.toString(), hashedPassword);

        if (!isCorrect) {
            res.status(400).json({
                isSuccess: false,
                message: "Incorrect password! Please try again...",
            });
            // have some logic for max attempt or max tries a user can do
            // when ever there is error, increase attempt count
            // after the threshold limit is reached, then block the activity for few hours
            return;
        }

        res.status(200).json({
            isSuccess: true,
            message: "User logged in!",
            data: {
                user: {
                    email: userDoc.email,
                    _id: userDoc._id,
                },
            },
        });
    } catch (err) {
        console.log("------- 🔴 Error in userLoginController --------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { userSignupController, userLoginController };
