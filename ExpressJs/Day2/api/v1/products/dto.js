const validateProductForCreation = (req, res, next) => {
    console.log("--> inside validateProductForCreation");
    try {
        const data = req.body;

        const { title, price, quantity } = data;

        if (!title || title.length < 5) {
            res.status(400).json({
                isSuccess: false,
                message: "Title is too short!",
            });
            return;
        }

        if (!price || price <= 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid Price!",
            });
            return;
        }

        if (!quantity || quantity <= 0) {
            res.status(400).json({
                isSuccess: false,
                message: "Invalid quantity!",
            });
            return;
        }

        req.body = { title: title.trim(), price, quantity };

        next();
    } catch (err) {
        console.log("---> Error in validateProductForCreation", err.message);
        res.status(500).json({ isSuccess: false, message: "Internal Server Error" });
    }
};

module.exports = { validateProductForCreation };
