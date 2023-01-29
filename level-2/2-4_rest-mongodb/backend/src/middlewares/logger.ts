import { Request, Response } from "express";
import { STATUS_CODES } from "http";

function logger(req: Request, res: Response, next: (err?: any) => any) {
    // Add date, method and url to log message when request come.
    let logMsg = `[${new Date().toLocaleString()}] [Method: ${req.method}] [URL: ${req.url}]`;

    // Add status, host, IP and response time on finish event of response.
    res.on("finish", () => {
        logMsg += ` [Status: ${res.statusCode} ${STATUS_CODES[res.statusCode]}]`;
        logMsg += ` [Host: ${req.hostname}] [IP: ${req.ip}] [Time: ${res.getHeader("X-Response-Time")}]`;
        console.log(logMsg);
    });

    next();
}

export default logger;