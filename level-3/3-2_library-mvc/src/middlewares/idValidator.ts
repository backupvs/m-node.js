import RequestError from "@errors/RequestError";
import { Request, Response, NextFunction } from "express";

export const idValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!+req.params.id) return next(new RequestError(400, "Wrong id parameter"));
    next();
}

export default idValidator;