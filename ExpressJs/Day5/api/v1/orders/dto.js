const placeOrderValidator = (req, res, next) => {
    try {
        console.log("------- inside updateItemInCartValidator --------");
        const { address } = req.body;

        if (address === "" || address === undefined || address === null) {
            res.status(400).json({
                isSuccess: false,
                message: "products and address is required!",
            });
            return;
        }

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

module.exports = { placeOrderValidator };
