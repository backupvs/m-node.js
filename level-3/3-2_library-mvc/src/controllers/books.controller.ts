import { NextFunction, Request, Response } from "express";
import Book from "@models/Book.model";
import { awsService } from "@services/aws.service";

export const getBookById = async (req: Request, res: Response) => {
    const [book] = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('404 Not found');

    res.render("book", { book });
};

export const increaseCounter = async (req: Request, res: Response) => {
    switch (req.body.counter) {
        case "want": await Book.increaseWantClicksById(req.params.id); break;
        case "view": await Book.increaseViewsById(req.params.id); break;
        default: return res.status(400).json({ error: "bad counter" });
    }
    res.json({ ok: true });
};

export const addBook = async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: "image was not provided" });

    const { generatedName } = await awsService.uploadImage(req.file);
    const book = new Book(
        req.body.bookTitle,
        req.body.about,
        `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${generatedName}`,
        req.body.bookYear,
        req.body.pages
    );

    await book.save();
    const authors = JSON.parse(req.body.authors);

    for (let author of authors) {
        if (!author) continue;
        const authorId = await Book.addAuthor(author);
        await book.addAssociation(authorId.toString());
    }

    res.status(201).json({ ok: true });
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.id) next();
    if (Number.isNaN(+req.query.id!)) return res.json({ err: "id must be a number" });

    try {
        const imageName = await Book.getImageNameById(req.query.id!.toString());
        await Book.deleteById(req.query.id!.toString());
        await awsService.deleteImage(imageName);
        res.status(200).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal error" });
    }
};

export const booksController = { getBookById, increaseCounter, addBook, deleteBook };