const { OtpModel } = require("../../../models/otpSchema");
const bcrypt = require("bcrypt");

const validateOtpMiddleware = async (req, res, next) => {
    try {
        console.log("------- inside validateOtpMiddleware ------");

        const { email, otp } = req.body;
        console.log("🟡 : email:", email);

        // verify if the otp is correct or not
        const otpDoc = await OtpModel.findOne().where("email").equals(email).sort("-createdAt");

        if (otpDoc == null) {
            res.status(400).json({
                isSuccess: false,
                message: "Otp not found! Please resend the otp to this email!",
            });
            return;
        }

        const { otp: hashedOtp } = otpDoc;

        const isCorrect = await bcrypt.compare(otp.toString(), hashedOtp);

        if (!isCorrect) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid OTP",
            });
            // have some logic for max attempt or max tries a user can do
            // when ever there is error, increase attempt count
            // after the threshold limit is reached, then block the activity for few hours
            return;
        }

        next();
    } catch (err) {
        console.log("------- 🔴 Error in validateOtpMiddleware --------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { validateOtpMiddleware };
