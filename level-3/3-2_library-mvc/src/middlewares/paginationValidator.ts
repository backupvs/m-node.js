import { Request, Response, NextFunction } from "express";
import Book from "@models/Book.model";

export const paginationValidator = async (req: Request, res: Response, next: NextFunction) => {
    const numberOfBooks = await Book.getNumberOfAll();
    let limit = req.query.limit ? +req.query.limit || +process.env.BOOKS_LIMIT! : +process.env.BOOKS_LIMIT!;
    let offset = req.query.offset ? +req.query.offset || 0 : 0;

    if (limit <= 0) limit = +process.env.BOOKS_LIMIT!;
    if (offset >= numberOfBooks) offset = numberOfBooks - limit;
    if (offset < 0) offset = 0;

    req.query.limit = limit.toString();
    req.query.offset = offset.toString();
    req.query.numberOfBooks = numberOfBooks;

    next();
}

export default paginationValidator