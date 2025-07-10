const http = require("http");
const fsPromises = require("fs/promises");

const server = http.createServer(async (req, res) => {
    try {
        console.log("-->", req.method, req.url, new Date());

        if (req.url === "/") {
            const data = await fsPromises.readFile("./pages/homePage.html", "utf-8");
            console.log("🟡 : data:", data);
            console.log("🟡 : typeof(data):", typeof data);
            console.log("------------------");
            console.log("------------------");

            const newData = data.replace("__MAIN__", "<h1>Hello from server!</h1>");
            console.log("🟡 : newData:", newData);
            console.log("🟡 : typeof(newData):", typeof newData);

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
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Something went wrong...</h1>");
    }
});

server.listen(3900, () => {
    console.log("---------- Server Started -----------");
});
