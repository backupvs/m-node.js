"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
function logger(req, res, next) {
    let logMsg = `[${new Date().toLocaleString()}] [Method: ${req.method}] [URL: ${req.url}]`;
    res.on("finish", () => {
        logMsg += ` [Status: ${res.statusCode} ${http_1.STATUS_CODES[res.statusCode]}]`;
        logMsg += ` [Host: ${req.hostname}] [IP: ${req.ip}] [Time: ${res.getHeader("X-Response-Time")}]`;
        console.log(logMsg);
    });
    next();
}
exports.default = logger;
