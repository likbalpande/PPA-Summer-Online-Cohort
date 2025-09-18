const placeOrderValidator = (req, res, next) => {
    try {
        console.log("------- inside updateItemInCartValidator --------");
        const { address, name, city, state, contactNumber1, contactNumber2 } = req.body;

        const keysToValidate = [address, name, city, state, contactNumber1, contactNumber2];

        keysToValidate.forEach((key) => {
            if (key === "" || key === undefined || key === null) {
                res.status(400).json({
                    isSuccess: false,
                    message: `Some required parameters are missing!\n${JSON.stringify(
                        { address, name, city, state, contactNumber1, contactNumber2 },
                        null,
                        2
                    )}`,
                });
                return;
            }
        });

        // if (products || !products.length === 0 || address === "" || address === undefined || address === null) {
        //     res.status(400).json({
        //         isSuccess: false,
        //         message: "products and address is required!",
        //     });
        //     return;
        // }

        // for (let product of products) {
        //     const { productId, quantity } = product;
        //     if (!productId || !quantity || quantity <= 0) {
        //         res.status(400).json({
        //             isSuccess: false,
        //             message: "Products validation failed either productId or quantity is missing!",
        //         });
        //         return;
        //     }
        //     if (!isValidObjectId(productId)) {
        //         res.status(400).json({
        //             isSuccess: false,
        //             message: "Invalid productId!",
        //         });
        //         return;
        //     }
        // }

        next();
    } catch (err) {
        console.log("------- 🔴 Error in updateItemInCartValidator --------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

const paymentStatusValidator = (req, res, next) => {
    try {
        console.log("------- inside updateItemInCartValidator --------");
        const { orderId } = req.params;

        if (orderId === "" || orderId === undefined || orderId === null) {
            res.status(400).json({
                isSuccess: false,
                message: `Invalid orderId`,
            });
            return;
        }

        next();
    } catch (err) {
        console.log("------- 🔴 Error in paymentStatusValidator --------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { placeOrderValidator, paymentStatusValidator };
