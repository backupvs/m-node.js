import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/User.model";

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.get("Authorization")) return sendError(res);

    const [username, password] = parseCredentials(req.get("Authorization")!);
    if (!await compareCredentials(username, password)) return sendError(res);

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



async function compareCredentials(username: string, password: string) {
    const [admin] = await User.getAdminByUsername(username);
    if (!admin) return false;
    const result = await bcrypt.compare(password, admin.password);
    return result;
}

export default basicAuth;