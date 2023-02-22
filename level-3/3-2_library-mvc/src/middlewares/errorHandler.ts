import { NextFunction, Request, Response } from "express";
import RequestError from "@errors/RequestError";
import { logger } from "@services/logger.service";

export const errorHandler = (error: RequestError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    let message = error.message;
    if (status === 500) {
        logger.error(error);
        message = "Something went wrong";
    }

    res.status(status).send({ status, error: message });
}

export default errorHandler;