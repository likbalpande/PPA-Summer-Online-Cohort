const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true, //**
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        description: String,
        quantity: {
            type: Number,
            default: 1,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const ProductModel = model("product", productSchema);

module.exports = { ProductModel };
