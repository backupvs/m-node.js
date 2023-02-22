import { Request, Response } from "express";
import Book from "@models/Book.model";

const LIMIT = 10;

export const showBooks = async (req: Request, res: Response) => {
    const totalBooks = await Book.getNumberOfAll();
    const totalPages = Math.ceil(totalBooks / LIMIT);
    let currentPage = Number(req.query.page) || 1;

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const offset = (currentPage - 1) * LIMIT;

    const books = await Book.getAllBooks(offset.toString(), LIMIT.toString());
    res.render("admin", { books, currentPage, totalPages });
};


export const adminController = { showBooks };