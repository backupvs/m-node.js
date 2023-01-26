import http from "http";

const port = 2000;
const host = "127.0.0.1";

const server = http.createServer((req, res) => {
    logTime(`${req.url} ${req.method} from ${req.headers.host}`);

    let body = "";

    req.on("data", data => {
        body += data;
    });

    req.on("end", () => {
        logTime(`END ${req.headers.host}`);
        console.log("Received data:", JSON.parse(body).data);
        sendJSON(res, body);
    });
    
    
});

server.listen(port, host, err => {
    if (err) throw err;
    console.log(`Listening on port ${port}`);
})

function logTime(text) {
    console.log(`[${new Date().toLocaleString()}] ${text}`);
}

function sendJSON(res, msg) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(msg);
}