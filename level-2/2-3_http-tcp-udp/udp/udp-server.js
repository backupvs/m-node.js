"use strict"

import dgram from "dgram";

const server = dgram.createSocket("udp4");
const port = 2000;

server.on("message", (msg, rinfo) => {
    logTime(`DATA from ${rinfo.address}:${rinfo.port}`);
    console.log(`Data received: ${msg}`);
    server.send(msg, rinfo.port, rinfo.address, err => {
        if (err) throw err;
    });
});

server.bind(2000, () => {
    console.log(`Listening on port ${port}`);
});

function logTime(text) {
    console.log(`[${new Date().toLocaleString()}] ${text}`);
}