"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
function logger(req, res, next) {
    // Add date, method and url to log message when request come.
    let logMsg = `[${new Date().toLocaleString()}] [Method: ${req.method}] [URL: ${req.url}]`;
    // Add status, host, IP and response time on finish event of response.
    res.on("finish", () => {
        logMsg += ` [Status: ${res.statusCode} ${http_1.STATUS_CODES[res.statusCode]}]`;
        logMsg += ` [Host: ${req.hostname}] [IP: ${req.ip}] [Time: ${res.getHeader("X-Response-Time")}]`;
        console.log(logMsg);
    });
    next();
}
exports.default = logger;
