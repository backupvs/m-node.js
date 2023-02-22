import { NextFunction, Request, Response } from "express";
import RequestError from "@errors/RequestError";
import { logger } from "@utils/logger.util";

export const errorHandler = (error: RequestError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    let message = error.message;
    if (status === 500) {
        logger.error(error);
        message = "Something went wrong";
    }

    res.status(status).json({ status, error: message, details: error.details || {} });
}

export default errorHandler;