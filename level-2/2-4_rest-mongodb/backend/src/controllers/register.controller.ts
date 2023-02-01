import { Request, Response } from "express";
import storageService from "../services/storage.service";
import { generateUserId } from "../services/storage.service";
import bcrypt from "bcrypt";

const success = { ok: true };
const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }

    const login = req.body.login;
    const pass = req.body.pass;

    const generatedId = await generateUserId();
    const storage = await storageService.getStorage();

    const index = storage.users.findIndex(user => user.login === login);

    if (index !== -1) {
        return res.status(400).json({ error: "login already exists" });
    }

    // TODO model User
    storage.users.push({
        id: generatedId,
        login: login,
        pass: await bcrypt.hash(pass, 10) // TODO hash
    });

    await storageService.updateStorage(storage);

    res.json(success);
}

export default { register }