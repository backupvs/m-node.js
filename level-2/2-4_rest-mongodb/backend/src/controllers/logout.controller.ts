import { Request, Response } from "express";

export const logout = (req: Request, res: Response) => {
    delete req.session.userId;
    res.json({ ok: true });
}

export default { logout }