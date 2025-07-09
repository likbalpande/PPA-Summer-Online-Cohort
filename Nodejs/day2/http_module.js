const http = require("node:http");

const server = http.createServer((req, res) => {
    console.log("Hello");
    res.writeHead(400, { "Content-Type": "text/html" });
    // res.writeHead(301, { location: "https://www.programmingpathshala.com/" });

    res.end("<h1 style='color:red'>Hello from NodeJS!</h1>");
}); // callback function is fired on http "request" event

server.listen(3900, () => {
    console.log("--------- Server Started ---------");
});

// http://localhost:3900
// http://127.0.0.1:3900
