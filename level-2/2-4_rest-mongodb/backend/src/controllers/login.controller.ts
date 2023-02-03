import { Request, Response } from "express";
import database from "../services/mongodb.service";
import bcrypt from "bcrypt";

const success = { ok: true };
const error = { error: "not found" };

export const login = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }

    const requestLogin = req.body.login;
    const requestPass = req.body.pass;

    const users = database.getUsersCollection();
    const user = await users.findOne({ login: requestLogin });

    if (user) {
        const result = await bcrypt.compare(requestPass, user.pass);
        if (result) {
            req.session.userId = user._id.toString();
            res.status(200).json(success);
        } else {
            res.status(400).json(error);
        }
    } else {
        res.status(400).json(error);
    }
}

export default { login }