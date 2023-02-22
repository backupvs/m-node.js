import { Request, Response } from "express";

export const renderNotFound = (req: Request, res: Response) => {
    res.status(404).render("not_found");
}

export default renderNotFound;