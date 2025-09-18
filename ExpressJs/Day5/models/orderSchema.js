const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "product",
                    required: true,
                },
                cartQuantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
        address: {
            type: String,
            trim: true,
            required: true,
        },
        contactNumbers: [String],
        orderStatus: {
            type: String,
            enum: ["Pending", "In Progress", "Delivered"],
            default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: [
                "INITIATED",
                "ABANDONED",
                // Below ENUMS are from CASHFREE
                "SUCCESS",
                "FAILED",
                "NOT_ATTEMPTED",
                "PENDING",
                "FLAGGED",
                "CANCELLED",
                "VOID",
                "USER_DROPPED",
            ],
            default: "INITIATED",
        },
        paymentDetails: Object,
        paymentSessionId: String,
        lastUpdatedPaymentDetails: Object,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ------------- default preferences ---------------
orderSchema.pre("findOneAndUpdate", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
orderSchema.pre("updateOne", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
orderSchema.pre("updateMany", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
// --------------------------------------------------

const OrderModel = model("order", orderSchema);

module.exports = { OrderModel };
