"use strict"

import dgram from "dgram";
import readline from "readline";

const client = dgram.createSocket("udp4");
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const message = {
    init: function (data) {
        this.data = data;
        this.sendTime = Date.now();
    }
};

readLine.on("line", (data) => {
    sendMessage(data);
});

client.on("message", (msg) => {
    console.log(`Received "${msg}": ${msg.toString() === message.data ? "EQUAL" : "NOT EQUAL"}`);
    console.log(`Time spent on sending and receiving message: ${Date.now() - message.sendTime}ms`);
});

function sendMessage(msg) {
    message.init(msg);
    client.send(message.data, 2000, "localhost", err => {
        if (err) {
            client.close();
            throw err;
        }
    });
}
