const { CartModel } = require("../../../models/cartSchema");
const { OrderModel } = require("../../../models/orderSchema");
const { ProductModel } = require("../../../models/productSchema");
const mongoose = require("mongoose");

const placeOrderController = async (req, res) => {
    try {
        console.log("--------- inside placeOrderController ----------");
        const { address } = req.body;

        const { _id: userId } = req.currentUser;

        const cartItems = await CartModel.find({
            user: userId,
        });

        // let allItemsAreInStock = true;

        // for (let product of cartItems) {
        //     const { product: productId, cartQuantity: quantity } = product;
        //     const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
        //         $inc: { quantity: -1 * quantity },
        //     });

        //     if (updatedProduct && updatedProduct.quantity < 0) {
        //         allItemsAreInStock = false;
        //     }
        // }

        // if (!allItemsAreInStock) {
        //     for (let product of cartItems) {
        //         const { product: productId, cartQuantity: quantity } = product;
        //         await ProductModel.findByIdAndUpdate(productId, {
        //             $inc: { quantity: quantity },
        //         });
        //     }

        //     res.status(500).json({
        //         isSuccess: false,
        //         message: "Some items are not in stock!",
        //         data: {},
        //     });
        //     return;
        // }

        const session = await mongoose.startSession();

        try {
            await session.withTransaction(async () => {
                const productsToOrder = [];

                for (let cartItem of cartItems) {
                    const { product: productId, cartQuantity } = cartItem;
                    const existingProduct = await ProductModel.findById(productId).lean();

                    productsToOrder.push({
                        product: productId,
                        cartQuantity: cartItem.cartQuantity,
                        price: existingProduct.price,
                    });

                    if (!existingProduct) {
                        throw new Error("Invalid product in the cart!");
                    } else if (existingProduct.quantity < cartQuantity) {
                        throw new Error("Some items are out of stock!");
                    } else {
                        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
                            $inc: { quantity: -1 * cartQuantity },
                        }).session(session);
                        console.log("🟡 : updatedProduct:", updatedProduct);

                        if (updatedProduct.quantity < 0) {
                            throw new Error("Some items are out of stock!");
                        }
                    }
                }

                await OrderModel.create(
                    [
                        {
                            user: userId,
                            products: productsToOrder,
                            address,
                        },
                    ],
                    { session }
                );
            });
        } catch (err) {
            res.status(409).json({
                isSuccess: false,
                message: err.message,
                data: {},
            });
            return;
        }

        await CartModel.deleteMany({
            user: userId,
        });

        // create an order with the "address"

        res.status(201).json({
            isSuccess: true,
            message: "Order placed!",
        });
    } catch (err) {
        console.log("--------- error in placeOrderController ----------", err.message);

        if (err.name === "ValidationError" || err.code == 11000) {
            res.status(400).json({
                isSuccess: false,
                message: err.message,
                data: {},
            });
            return;
        }

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = { placeOrderController };
