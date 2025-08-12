const { OrderModel } = require("../../../../models/orderSchema");

const getAllOrdersForAdminController = async (req, res) => {
    try {
        console.log("------------ inside getAllOrdersForAdminController ----------");

        const orders = await OrderModel.find().populate("user");

        res.status(200).json({
            isSuccess: true,
            message: "Orders list fetched!",
            data: {
                orders: orders,
            },
        });
    } catch (err) {
        console.log("--------- error in getAllOrdersForAdminController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = { getAllOrdersForAdminController };
