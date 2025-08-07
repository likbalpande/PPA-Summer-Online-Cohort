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
