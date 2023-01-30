import { Request, Response } from "express";
import storageService from "../services/storage.service";

const success = { ok: true };
const error = { error: "bad authentication data" };

export const login = async (req: Request, res: Response) => {
    if (req.session.userId) {
        res.status(400).json({ error: "already logged in" });
        return;
    }

    const login = req.body.login;
    const pass = req.body.pass;
    
    const storage = await storageService.getStorage();
    const index = storage.users.findIndex(user => user.login === login);

    if (index !== -1) {
        if (storage.users[index].pass === pass) {
            req.session.userId = storage.users[index].id;
            res.json(success);
        } else {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json(error);
    }
}

export default { login }