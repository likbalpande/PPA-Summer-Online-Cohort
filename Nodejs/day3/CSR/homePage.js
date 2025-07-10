const root = document.getElementById("root");

const getData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    renderUi(data);
};

const renderUi = (data) => {
    const { products } = data;

    products.forEach((elem) => {
        const newContainer = document.createElement("div");
        newContainer.className = "card";
        newContainer.innerHTML = `
            <img src="${elem.thumbnail}" width='200'/>
            <h4>${elem.title}</h4>
            <h6>Price: ${elem.price}</h6>
            `;
        root.appendChild(newContainer);
    });
};

getData();
