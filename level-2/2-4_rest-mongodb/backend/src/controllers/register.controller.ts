import { Request, Response } from "express";
import database from "../services/mongodb.service";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

const success = { ok: true };
const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }

    const requestLogin = req.body.login;
    const requestPass = req.body.pass;

    const users = database.getUsersCollection();
    const user = await users.findOne({ login: requestLogin });

    if (user) {
        return res.status(400).json({ error: "login already exists" });
    }

    users.insertOne(new User(requestLogin, await bcrypt.hash(requestPass, saltRounds)));
    res.status(201).json(success);
}

export default { register }