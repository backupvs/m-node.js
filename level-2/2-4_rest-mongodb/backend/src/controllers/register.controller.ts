import { Request, Response } from "express";
import storageService from "../services/storage.service";
import { generateUserId } from "../services/storage.service";

const success = { ok: true };

export const register = async (req: Request, res: Response) => {
    if (req.session.userId) {
        res.status(400).json({ error: "already logged in" });
        return;
    }

    const login = req.body.login;
    const pass = req.body.pass; // TODO validation
    
    const generatedId = await generateUserId();
    const storage = await storageService.getStorage();

    const index = storage.users.findIndex(user => user.login === login);

    if (index !== -1) {
        res.status(400).json({ error: "login already exists" });
        return;
    }

    // TODO model User
    storage.users.push({
        id: generatedId,
        login: login,
        pass: pass // TODO hash
    });

    await storageService.updateStorage(storage);

    res.json(success);
}

export default { register }