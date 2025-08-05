const { ObjectId } = require("mongodb");

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const cartSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "user",
            required: true,
        },
        product: {
            type: ObjectId,
            ref: "product",
            required: true,
        },
        cartQuantity: {
            type: Number,
            default: 1,
            min: 1,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ------------- default preferences ---------------
cartSchema.pre("findOneAndUpdate", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
cartSchema.pre("updateOne", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
cartSchema.pre("updateMany", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
// --------------------------------------------------

const CartModel = model("cart", cartSchema);

module.exports = { CartModel };
