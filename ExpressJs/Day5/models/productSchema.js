const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 0,
        },
        description: {
            type: String,
        },
        images: [String],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// ------------- default preferences ---------------
productSchema.pre("findOneAndUpdate", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
productSchema.pre("updateOne", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
productSchema.pre("updateMany", function () {
    this.options.runValidators = true;
    this.options.new = true;
});
// --------------------------------------------------

const ProductModel = model("product", productSchema);

module.exports = { ProductModel };
