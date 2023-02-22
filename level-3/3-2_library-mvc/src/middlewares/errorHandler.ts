import { NextFunction, Request, Response } from "express";
import RequestError from "@errors/RequestError";

export const errorHandler = (error: RequestError, req: Request, res: Response) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    
    res.status(status).send({ status, error: message });
}

export default errorHandler;