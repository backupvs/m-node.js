import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.get("Authorization")) return sendError(res);

    const [username, password] = parseCredentials(req.get("Authorization")!);
    if (!compareCredentials(username, password)) return sendError(res);

    res.status(200);
    next();
};

function sendError(res: Response) {
    res.set("WWW-Authenticate", "Basic").sendStatus(401);
}

function parseCredentials(credentials: string) {
    const [username, password] = Buffer.from(credentials
        .split(" ")[1], "base64")
        .toString()
        .split(":");

    return [username, password];
}

function compareCredentials(username: string, password: string) {
    return (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD);
}

export default basicAuth;