import { Request, Response } from "express";

export const renderNotFound = (req: Request, res: Response) => {
    res.render("not_found");
}

export default renderNotFound;