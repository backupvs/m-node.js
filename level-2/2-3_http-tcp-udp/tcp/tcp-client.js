"use strict"

import net from "net";
import readline from "readline";

const client = new net.Socket();
const port = 2000;
const host = "127.0.0.1";
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let message = {
    data: "",
    sendTime: null,
    init: function (data) {
        this.data = data;
        this.sendTime = Date.now();
    }
};

readLine.on("line", data => {
    message.init(data);
    client.write(data);
});

client.connect(port, host, () => {
    console.log(`Connected succesfully to ${host}:${port}`);
    client.write(message.data);
});

client.on("data", data => {
    const dataStr = data.toString();
    console.log(`Received "${dataStr}": ${dataStr === message.data ? "EQUAL" : "NOT EQUAL"}`);
    console.log(`Time spent on sending and receiving message: ${Date.now() - message.sendTime}ms`)
});

client.on("close", () => {
    console.log("Connection closed");
    readLine.close();
});

client.on("error", () => {
    console.log("The server seems to have been shut down...");
});