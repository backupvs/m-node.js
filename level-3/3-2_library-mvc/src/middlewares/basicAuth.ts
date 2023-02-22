import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/User.model";

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.get("Authorization")) return sendBadAuth(res);

    const [username, password] = parseCredentials(req.get("Authorization")!);
    if (!await compareCredentials(username, password)) return sendBadAuth(res);

    next();
};

function sendBadAuth(res: Response) {
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

    return await bcrypt.compare(password, admin.password);
}

export default basicAuth;