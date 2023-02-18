import { Request, Response, NextFunction } from "express";
import Book from "@models/Book.model";

const DEFAULT_BOOKS_LIMIT = 12;
const DEFAULT_BOOKS_OFFSET = 0;

export const paginationValidator = async (req: Request, res: Response, next: NextFunction) => {
    const totalBooks = await Book.getNumberOfAll();

    let limit = Number(req.query.limit) || DEFAULT_BOOKS_LIMIT;
    let offset = Number(req.query.offset) || DEFAULT_BOOKS_OFFSET;

    if (limit <= 0) limit = DEFAULT_BOOKS_LIMIT;
    if (offset >= totalBooks) offset = totalBooks - limit;
    if (offset < 0) offset = 0;

    req.query.limit = limit.toString();
    req.query.offset = offset.toString();
    req.query.totalBooks = totalBooks.toString();

    next();
}

export default paginationValidator;