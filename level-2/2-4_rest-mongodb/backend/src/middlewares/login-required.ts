import { Request, Response } from "express";

export const loginRequired = (req: Request, res: Response, next: (err?: any) => any) => {
    if (!req.session.user) {
        res.status(401).json({ error: "unauthorized" });
    } else {
        next();
    }
};

export default loginRequired;