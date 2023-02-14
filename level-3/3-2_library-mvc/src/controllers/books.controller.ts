import { Request, Response } from "express"
import Book from "@models/Book.model";

export const getBookById = async (req: Request, res: Response) => {
    if (!+req.params.id) return res.status(400).json({ error: "wrong id parameter" });

    const [book] = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "non-existent id" });

    await Book.increaseViewsById(req.params.id);
    res.render("book", { book });
};

export default { getBookById };