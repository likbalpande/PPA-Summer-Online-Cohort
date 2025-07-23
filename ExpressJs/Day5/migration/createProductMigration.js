const data = require("./data.json");

const createProduct = async (data) => {
    try {
        const resp = await fetch("http://localhost:3900/api/v1/products", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await resp.json();

        if (resp.status != 201) {
            console.log("------ product not created ------");
            console.log(result.message);
            console.log("---- ------");
        }
    } catch (err) {
        console.log("---- Error creating product ------", err.message);
        console.log("---- ------");
    }
};

const createProductMigration = async () => {
    const { products } = data;
    for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        productData.price = Math.round(productData.price * 85); // converting dollars to rupees
        await createProduct(productData);
        console.log("Product Created...", i + 1);
    }
};

createProductMigration();
