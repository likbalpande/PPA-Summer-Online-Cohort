const createProductValidator = (req, res, next) => {
    try {
        console.log("--------- inside createProductValidator ----------");

        const { title, price, description, quantity } = req.body;

        if (quantity && quantity < 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Quantity should be > 0",
                data: {},
            });
            return;
        }

        if (!price || price < 1) {
            res.status(400).json({
                isSuccess: false,
                message: "Price should be > 1",
                data: {},
            });
            return;
        }

        if (!title || title.length <= 2) {
            res.status(400).json({
                isSuccess: false,
                message: "Title length > 2",
                data: {},
            });
            return;
        }

        if (description && description.length <= 5) {
            res.status(400).json({
                isSuccess: false,
                message: "Description is too short...",
                data: {},
            });
            return;
        }

        next();
    } catch (err) {
        console.log("--------- error in createProductValidator ----------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const updateProductValidator = (req, res, next) => {
    try {
        console.log("--------- inside updateProductValidator ----------");

        // 9051231231 ✅
        // 901239278947498 ❌
        // validate the productId against mongoose objectId

        const { title, price, description, quantity } = req.body;

        if (quantity && quantity < 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Quantity should be > 0",
                data: {},
            });
            return;
        }

        if (price && price < 1) {
            res.status(400).json({
                isSuccess: false,
                message: "Price should be > 1",
                data: {},
            });
            return;
        }

        if (title && title.length <= 2) {
            res.status(400).json({
                isSuccess: false,
                message: "Title length > 2",
                data: {},
            });
            return;
        }

        if (description && description.length <= 5) {
            res.status(400).json({
                isSuccess: false,
                message: "Description is too short...",
                data: {},
            });
            return;
        }

        next();
    } catch (err) {
        console.log("--------- error in updateProductValidator ----------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

const deleteProductValidator = (req, res, next) => {
    try {
        console.log("--------- inside deleteProductValidator ----------");

        // 9051231231 ✅
        // 901239278947498 ❌
        // validate the productId against mongoose objectId

        next();
    } catch (err) {
        console.log("--------- error in deleteProductValidator ----------", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = { createProductValidator, updateProductValidator, deleteProductValidator };
