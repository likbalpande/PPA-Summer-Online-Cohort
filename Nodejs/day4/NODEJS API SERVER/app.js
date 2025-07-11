const http = require("http");

const server = http.createServer((req, res) => {
    console.log("-->", req.method, req.url);

    res.writeHead(200, { "content-type": "application/json" });

    res.end(
        JSON.stringify({
            isSuccess: true,
            message: "Server is running fine!",
        })
    ); // request / response --> data packets (binary)
});

server.listen(2900, () => {
    console.log("---------= Server Started =---------");
});
