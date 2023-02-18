import { Request, Response } from "express";
import Book from "@models/Book.model";

export const findBooks = async (req: Request, res: Response) => {
    const offset = +req.query.offset!;
    const limit = +req.query.limit!;
    const totalBooks = req.query.totalBooks!;

    const books = await Book.find(
        createSearchQuery(req.query.search?.toString()),
        createSearchQuery(req.query.author?.toString()),
        createSearchQuery(req.query.year?.toString()),
        offset.toString(),
        limit.toString()
    );

    res.render("books", { books, totalBooks, offset, limit, searchQuery: req.query.search });
}

const createSearchQuery = (query: string | undefined): string => `%${query || ""}%`;

export default { findBooks };