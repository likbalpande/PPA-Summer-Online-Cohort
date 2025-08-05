const { CartModel } = require("../../../models/cartSchema");

const addItemToCartController = async (req, res) => {
    try {
        console.log("--------- inside addItemToCartController ----------");
        const { productId } = req.params;
        const { _id } = req.currentUser;

        const cartItem = await CartModel.findOne({
            user: _id,
            product: productId,
        });

        if (cartItem) {
            await CartModel.findByIdAndUpdate(cartItem._id, {
                cartQuantity: cartItem.cartQuantity + 1,
                // $inc: {cartQuantity: 1} // try to ask
            });
        } else {
            await CartModel.create({
                user: _id,
                product: productId,
            });
        }

        res.status(201);
        res.json({
            isSuccess: true,
            message: "Product added to cart!",
        });
    } catch (err) {
        console.log("--------- error in addItemToCartController ----------", err.message);

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

const getCartItemsController = async (req, res) => {
    try {
        console.log("--------- inside getCartItemsController ----------");

        const { _id } = req.currentUser;

        const cartItems = await CartModel.find({
            user: _id,
        })
            .populate("product")
            .lean();

        res.status(201);
        res.json({
            isSuccess: true,
            message: "Product added to cart!",
            data: {
                cart: cartItems,
            },
        });
    } catch (err) {
        console.log("--------- error in getCartItemsController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = { getCartItemsController, addItemToCartController };
