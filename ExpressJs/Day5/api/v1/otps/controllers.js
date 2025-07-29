const { customAlphabet } = require("nanoid");
const { OtpModel } = require("../../../models/otpSchema");
const { sendOtpEmail } = require("../../../utils/emailHelper");

const nanoid = customAlphabet("123456789", 6);

const sendOtpController = async (req, res) => {
    try {
        console.log("------- inside sendOtpController ------");

        const { email } = req.body;

        // check is otp is already sent
        // if otp is already sent and the createdAt for that OTP is less than currentTime - 10 minutes
        // then only send the new otp and delete the old otp from DB
        // otherwise don't send new otp, just send a response as OTP was already sent!

        // const otp1 = Math.floor(Math.random() * 900000 + 100000);
        // console.log("🟡 : otp1:", otp1);

        const otp = nanoid();

        // send the otp to the email
        await sendOtpEmail(email, otp);

        // store the otp in the database
        await OtpModel.create({ email, otp });

        // send success response
        res.status(201).json({
            isSuccess: true,
            message: "Otp Sent!",
        });
    } catch (err) {
        console.log("------- 🔴 Error in sendOtpController --------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { sendOtpController };
