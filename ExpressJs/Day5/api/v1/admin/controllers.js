const sendAdminInfoController = (req, res) => {
    res.status(200).json({
        isSuccess: true,
        message: "User is Admin",
    });
};

module.exports = { sendAdminInfoController };
