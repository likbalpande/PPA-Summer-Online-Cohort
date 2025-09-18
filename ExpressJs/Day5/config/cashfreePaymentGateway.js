const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashFreePaymentGateway = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_PAYMENT_GATEWAY_APP_ID,
    process.env.CASHFREE_PAYMENT_GATEWAY_SECRET_KEY
);

module.exports = { cashFreePaymentGateway };
