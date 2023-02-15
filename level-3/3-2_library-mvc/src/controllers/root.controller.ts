import { Request, Response } from "express";
import Book from "@models/Book.model";

export const findBooks = async (req: Request, res: Response) => {
    const offset = +req.query.offset!;
    const limit = +req.query.limit!;
    const numberOfBooks = req.query.numberOfBooks!;

    const search = makeSearchQuery(req.query.search?.toString() || "");
    const author = makeSearchQuery(req.query.author?.toString() || "");
    const year = makeSearchQuery(req.query.year?.toString() || "");

    const books = await Book.find(search, author, year, offset.toString(), limit.toString());
    
    res.render("books", {
        books,
        numberOfBooks,
        offset,
        limit,
        searchQuery: req.query.search
    });
}

const makeSearchQuery = (query: string) => "%" + query + "%";

export default { findBooks };