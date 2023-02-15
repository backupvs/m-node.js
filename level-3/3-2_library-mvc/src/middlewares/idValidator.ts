import { Request, Response, NextFunction } from "express";

export const idValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!+req.params.id) return res.status(400).json({ error: "wrong id parameter" });
    next();
}

export default idValidator