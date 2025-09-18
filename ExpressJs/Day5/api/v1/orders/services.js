const { cashFreePaymentGateway } = require("../../../config/cashfreePaymentGateway");

const createPaymentSession = async ({ totalAmount, orderId, userId, contactNumber }) => {
    console.log(`🟡 : { totalAmount, orderId, userId, contactNumber }:`, {
        totalAmount,
        orderId,
        userId,
        contactNumber,
    });
    console.log("--------- inside createPaymentSession ----------");

    var request = {
        order_amount: totalAmount,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
            customer_id: userId,
            customer_phone: contactNumber,
        },
        order_meta: {
            return_url: "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}",
        },
    };

    const paymentSession = new Promise((resolve, reject) => {
        cashFreePaymentGateway
            .PGCreateOrder(request)
            .then((response) => {
                console.log("---- Order created successfully for", userId, "----");
                resolve(response.data);
            })
            .catch((error) => {
                console.log("🟡 : error:", error.response.data);
                reject(error.response.data.message);
            });
    });

    return paymentSession;
};

const getPaymentDetails = async ({ orderId }) => {
    const paymentDetails = new Promise((resolve, reject) => {
        cashFreePaymentGateway
            .PGOrderFetchPayments(orderId)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error.response.data.message);
            });
    });

    return paymentDetails;
};

module.exports = { createPaymentSession, getPaymentDetails };
