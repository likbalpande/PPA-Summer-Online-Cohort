// sending EMAIL
const nodemailer = require("nodemailer");

// Create a transporter for SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // gmail
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

(async () => {
    try {
        await transporter.verify();
        console.log("--------- ✅ Email Server is Ready --------------");
    } catch (err) {
        console.log("--------- 🔴 Error connecting Email Server --------------");
        console.log(err.message);
    }
})(); //IIFE

const sendEmail = async (toEmail, subject, htmlText) => {
    try {
        await transporter.sendMail({
            from: `"Shopping App Verification Team" <${process.env.SMTP_USER}>`, // sender address
            to: toEmail, // receiver's email
            subject: subject, // Subject line
            html: htmlText, // html body
        });

        console.log("----------- ✅ Message sent -----------------");
    } catch (err) {
        console.log("----------- ❌ Error while sending mail ------------");
        console.log(err.message);
        console.log("----------- --------------------------- ------------");
        throw new Error("Email not sent");
    }
};

const sendOtpEmail = async (toEmail, otp) => {
    console.log("... Sending OTP Email to ", toEmail);
    await sendEmail(
        toEmail,
        "Otp Verification for Shopping App",
        `
            <html>
            <head>
                <style>
                    div{
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: center;
                        justify-content: center;
                        padding: 5rem;
                    }
                    h2{
                        color: darkblue;
                    }
                    h1{
                        color: chocolate;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h2>Your OTP for verifying the email is:</h2>
                    <h1>${otp}</h1>
                </div>
            </body>
            </html>
        
        `
    );
};

module.exports = { sendOtpEmail };
