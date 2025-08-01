const sendUserInfoController = (req, res) => {
    try {
        const user = req.currentUser;

        res.status(200).json({
            isSuccess: true,
            message: "User is logged in!",
            data: {
                user: {
                    email: user.email,
                },
            },
        });
        console.log("------- inside sendUserInfoController ------");
    } catch (err) {
        console.log("------- 🔴 Error in sendUserInfoController --------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { sendUserInfoController };
