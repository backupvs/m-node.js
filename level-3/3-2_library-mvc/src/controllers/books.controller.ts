import { Request, Response } from "express";
import Book from "@models/Book.model";

export const getAllBooks = async (req: Request, res: Response) => {
    const numberOfBooks = await Book.getNumberOfAll();
    let limit = req.query.limit ? +req.query.limit || +process.env.BOOKS_LIMIT! : +process.env.BOOKS_LIMIT!;
    let offset = req.query.offset ? +req.query.offset || 0 : 0;

    if (limit <= 0) limit = +process.env.BOOKS_LIMIT!;
    if (offset >= numberOfBooks) offset = numberOfBooks - limit;
    if (offset < 0) offset = 0;

    // if (isBadQueries) return res.redirect(`/?offset=${offset}&limit=${limit}`);

    const books = await Book.findAll(offset, limit);
    
    res.render("books", {
        books,
        numberOfBooks,
        offset,
        limit
    });
}

export default { getAllBooks };