import { Response } from "express";

export const showAdminPanel = (res: Response) => {
    res.render("admin");
};

export default { showAdminPanel };