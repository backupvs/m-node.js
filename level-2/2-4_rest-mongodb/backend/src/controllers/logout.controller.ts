import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
    if (!req.session.userId) {
        res.status(400).json({ error: "already logged out" });
        return;
    }

    delete req.session.userId;
    res.json({ ok: true });
}

export default { logout }