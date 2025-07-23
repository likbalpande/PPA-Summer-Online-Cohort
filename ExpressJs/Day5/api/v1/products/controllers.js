const { ProductModel } = require("../../../models/productSchema");

// C
const createProductController = async (req, res) => {
    try {
        console.log("--------- inside createProductController ----------");
        const data = req.body;
        const newProduct = await ProductModel.create(data);

        res.status(201);
        res.json({
            isSuccess: true,
            message: "Product created!",
            data: {
                product: newProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in createProductController ----------", err.message);

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

// R
const getAllProductsController = async (req, res) => {
    try {
        console.log("--------- inside getAllProductsController ----------");
        // what if data is having millions of documents?
        const result = await ProductModel.find(); // await or .then() or .exec()

        res.status(200).json({
            isSuccess: true,
            message: "Product list",
            data: {
                products: result,
            },
        });
    } catch (err) {
        console.log("--------- error in getAllProductsController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

// U
const updateProductController = async (req, res) => {
    try {
        console.log("--------- inside updateProductController ----------");
        const data = req.body;
        const { productId } = req.params;

        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, data).lean(); //{new: true,runValidators: true,}

        if (updatedProduct === null) {
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Id does not match",
                data: {},
            });
            return;
        }

        res.status(200);
        res.json({
            isSuccess: true,
            message: "Product updated!",
            data: {
                product: updatedProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in updateProductController ----------", err.message);

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

// D
const deleteProductController = async (req, res) => {
    try {
        console.log("--------- inside deleteProductController ----------");
        const { productId } = req.params;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        if (deletedProduct === null) {
            res.status(400);
            res.json({
                isSuccess: false,
                message: "Invalid product id!",
                data: {},
            });
            return;
        }

        res.status(204); // no content
        res.json({
            isSuccess: true,
            message: "Product delete!",
            data: {
                product: deletedProduct,
            },
        });
    } catch (err) {
        console.log("--------- error in deleteProductController ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

// list products (**)
// query, filters, pagination, regex
const listProductsControllers = async (req, res) => {
    try {
        console.log("--------- inside listProductsControllers ----------");
        const { limit, page, select = "title price quantity", q = "", maxPrice } = req.query;

        const searchRegex = new RegExp(q, "ig");

        const selectedItems = select.replaceAll(",", " ");

        let limitNum = Number(limit);
        if (limitNum <= 0 || Number.isNaN(limitNum)) {
            limitNum = 5;
        }
        let pageNum = Number(page) || 1;
        if (pageNum <= 0 || Number.isNaN(pageNum)) {
            pageNum = 1;
        }
        const skipNum = (pageNum - 1) * limitNum;

        const query = ProductModel.find(); // waiter will come and start taking order
        query.select(selectedItems); // giving waiter some order items
        query.or([{ title: searchRegex }, { description: searchRegex }]); // giving waiter some order items

        const maxPriceNum = Number(maxPrice);
        if (maxPrice && !Number.isNaN(maxPriceNum)) {
            query.where("price").lte(maxPrice); // giving waiter some order items
        }

        const totalDocumentsCount = await query.clone().countDocuments(); // the clone query will have all the instructions that have been given till now

        // limit the number of items (PAGINATION)
        query.skip(skipNum); // giving waiter some order items
        query.limit(limitNum); // giving waiter some order items

        const products = await query; // telling waiter that i have given my order now execute it

        res.status(200).json({
            isSuccess: true,
            message: "Product list",
            data: {
                products,
                total: totalDocumentsCount,
                skip: skipNum,
                limit: Math.min(limitNum, products.length),
            },
        });
    } catch (err) {
        console.log("--------- error in listProductsControllers ----------", err.message);

        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data: {},
        });
    }
};

module.exports = {
    listProductsControllers,
    createProductController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
};
