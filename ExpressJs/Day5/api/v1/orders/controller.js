const { CartModel } = require("../../../models/cartSchema");
const { OrderModel } = require("../../../models/orderSchema");
const { ProductModel } = require("../../../models/productSchema");
const { createPaymentSession, getPaymentDetails } = require("./services");

const mongoose = require("mongoose");

const placeOrderController = async (req, res) => {
    try {
        console.log("--------- inside placeOrderController ----------");
        const { name, address, city, state, contactNumber1, contactNumber2 } = req.body;

        const { _id: userId } = req.currentUser;

        const cartItems = await CartModel.find({
            user: userId,
        });

        if (cartItems.length === 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Cart is Empty!",
            });
        }

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

        let newOrder = null;
        let totalAmount = 0;
        let paymentResult = null;

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

                    totalAmount += cartItem.cartQuantity * existingProduct.price;

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

                newOrder = await OrderModel.create(
                    [
                        {
                            user: userId,
                            products: productsToOrder,
                            address: `Name:${name}\n Address:${address}\n City: ${city}\n State: ${state}`,
                            contactNumbers: [contactNumber1, contactNumber2],
                        },
                    ],
                    { session }
                );

                try {
                    paymentResult = await createPaymentSession({
                        userId,
                        totalAmount,
                        orderId: newOrder[0]._id,
                        contactNumber: contactNumber1,
                    });
                } catch (err) {
                    session.abortTransaction();
                    throw new Error(err.message || "Payment Gateway Error");
                }

                await OrderModel.findByIdAndUpdate(
                    newOrder[0]._id,
                    {
                        paymentDetails: paymentResult,
                        paymentSessionId: paymentResult.payment_session_id,
                    },
                    { session: session }
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

        res.status(201).json({
            isSuccess: true,
            message: "Order placed!",
            data: {
                paymentDetails: paymentResult,
                orderId: newOrder[0]._id,
            },
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

const getPaymentStatusController = async (req, res) => {
    try {
        console.log("--------- inside getPaymentStatusController ----------");
        const { orderId } = req.params;

        const paymentDetails = await getPaymentDetails({ orderId });

        if (paymentDetails.length !== 0) {
            const { payment_status } = paymentDetails[0];

            if (payment_status !== null && payment_status !== undefined) {
                await OrderModel.findByIdAndUpdate(orderId, {
                    lastUpdatedPaymentDetails: paymentDetails[0],
                    paymentStatus: payment_status,
                });
            } else {
                throw new Error("Payment Status key is not present!");
            }
        }

        res.status(200).json({
            isSuccess: true,
            message: "Payment details fetched!",
            data: {
                paymentDetails,
            },
        });
    } catch (err) {
        console.log("--------- error in getPaymentStatusController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const getAllOrdersForClientController = async (req, res) => {
    try {
        console.log("------------ inside getAllOrdersForClientController ----------");

        const orders = await OrderModel.find()
            .select("-lastUpdatedPaymentDetails -paymentDetails -paymentSessionId")
            .populate("user");
        // .populate("product");

        res.status(200).json({
            isSuccess: true,
            message: "Orders list fetched!",
            data: {
                orders: orders,
            },
        });
    } catch (err) {
        console.log("--------- error in getAllOrdersForClientController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const checkForAbandonedOrdersCronJob = async () => {
    try {
        // console.log("------------ inside checkForAbandonedOrdersCronJob ----------");
        const currentTime = Date.now();
        const before15Minutes = currentTime - 15 * 60 * 1000;

        const orders = await OrderModel.find({
            paymentStatus: "INITIATED",
            createdAt: {
                $lte: before15Minutes,
            },
        }).lean();

        for (let order of orders) {
            const paymentDetails = await getPaymentDetails({ orderId: order._id });

            if (paymentDetails.length !== 0) {
                const { payment_status } = paymentDetails[0];

                if (payment_status !== null && payment_status !== undefined) {
                    await OrderModel.findByIdAndUpdate(order._id, {
                        lastUpdatedPaymentDetails: paymentDetails[0],
                        paymentStatus: payment_status,
                    });
                }
            } else {
                const { products } = order;
                for (let product of products) {
                    await ProductModel.findByIdAndUpdate(
                        product.product,
                        {
                            $inc: { quantity: product.cartQuantity },
                        },
                        { new: true }
                    );
                }
                await OrderModel.findByIdAndUpdate(
                    order._id,
                    {
                        paymentStatus: "ABANDONED",
                    },
                    { new: true }
                );
            }
        }

        // console.log("------------ checkForAbandonedOrdersCronJob completed ----------");
    } catch (err) {
        console.log("--------- error in checkForAbandonedOrdersCronJob ----------", err.message);
    }
};

module.exports = {
    placeOrderController,
    getPaymentStatusController,
    getAllOrdersForClientController,
    checkForAbandonedOrdersCronJob,
};
