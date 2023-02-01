import { Request, Response } from "express";
import storageService from "../services/storage.service";
import bcrypt from "bcrypt";

const success = { ok: true };
const error = { error: "not found" };

export const login = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }

    const login = req.body.login;
    const pass = req.body.pass;

    const storage = await storageService.getStorage();
    const index = storage.users.findIndex(user => user.login === login);

    if (index !== -1) {
        const result = await bcrypt.compare(pass, storage.users[index].pass);
        if (result) {
            req.session.userId = storage.users[index].id;
            res.status(201).json(success);
        } else {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json(error);
    }
}

export default { login }