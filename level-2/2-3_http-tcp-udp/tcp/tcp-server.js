"use strict"

import net from "net";

const port = 2000;
const host = "127.0.0.1";

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`Listening on port ${port}`);
});

server.on("connection", socket => {
    logTime(`CONNECTED ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on("data", data => {
        logTime(`DATA from ${socket.remoteAddress}:${socket.remotePort}`);
        console.log(`Data received: ${data}`);
        data.toString() === "quit" ? socket.end() : socket.write(data);
    });

    socket.on("close", () => {
        logTime(`CLOSED ${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on("error", err => {
        logTime(`SOCKET ERROR ${socket.remoteAddress}:${socket.remotePort}`);
        console.log(`Error message: ${err.message}`);
    });
});

function logTime(text) {
    console.log(`[${new Date().toLocaleString()}] ${text}`);
}

