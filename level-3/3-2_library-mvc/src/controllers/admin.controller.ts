import { Request, Response } from "express";

export const showAdminPanel = (req: Request, res: Response) => {
    res.render("admin");
};

export default { showAdminPanel };