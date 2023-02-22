import { NextFunction, Request, Response } from "express";

type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Middleware that catches errors thrown by route handlers
 * and gives them to error handler.
 */
export const catchErrors = (handler: Controller) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

export default catchErrors;