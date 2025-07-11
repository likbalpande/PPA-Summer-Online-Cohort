const http = require("http");
const fsPromises = require("fs/promises");
const { getProductCards } = require("./utils/product_helper");

const server = http.createServer(async (req, res) => {
    try {
        console.log("-->", req.method, req.url, new Date());

        if (req.url === "/") {
            const data = await fsPromises.readFile("./pages/homePage.html", "utf-8");
            const cardsStr = await getProductCards();
            // <div class='card'>
            //     <img src="https://img.freepik.com/premium-photo/books-white_144962-2091.jpg?semt=ais_hybrid&w=740" width='200'/>
            //     <h4>Book</h4>
            //     <h6>Price: 200</h6>
            // </div>
            const newData = data.replace("__MAIN__", cardsStr);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(newData);
        } else if (req.url === "/about") {
            const data = await fsPromises.readFile("./pages/aboutPage.html", "utf-8");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        } else {
            const data = await fsPromises.readFile("./pages/notFoundPage.html", "utf-8");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }
    } catch (err) {
        console.log("🟡 : err:", err);
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Something went wrong...</h1>");
    }
});

server.listen(3900, () => {
    console.log("---------- Server Started -----------");
});
