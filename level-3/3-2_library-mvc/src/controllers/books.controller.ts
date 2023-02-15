import { Request, Response, NextFunction } from "express";
import Book from "@models/Book.model";

export const getBookById = async (req: Request, res: Response) => {
    const [book] = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "non-existent id" });

    res.render("book", { book });
};

export const increaseCounter = async (req: Request, res: Response, next: NextFunction) => {
    switch(req.body.counter) {
        case "want": await Book.increaseWantClicksById(req.params.id); break;
        case "view": await Book.increaseViewsById(req.params.id); break;
        default: return res.status(400).json({ error: "bad counter" });
    }
    res.json({ ok: true });
}

export default { getBookById, increaseCounter };