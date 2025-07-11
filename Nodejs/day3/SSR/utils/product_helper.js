const getProductsFromDB = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data;
};

const getProductCards = async () => {
    const { products } = await getProductsFromDB();
    let res = "";
    products.forEach((elem) => {
        const cardStr = `
            <div class='card'>
                    <img src="${elem.thumbnail}" width='200'/>
                    <h4>${elem.title}</h4>
                    <h6>Price: ${elem.price}</h6>
            </div>`;

        res = res + "\n" + cardStr;
    });
    return res;
};

module.exports = {
    getProductCards,
};
