import { NextFunction, Request, Response } from "express";
import Book from "@models/Book.model";
import { awsService } from "@services/aws.service";
import RequestError from "@errors/RequestError";
import { validateBook } from "@middlewares/bookValidator";

export const getBookById = async (req: Request, res: Response) => {
    const [book] = await Book.findById(req.params.id);
    if (!book) return res.render("not_found");
    await Book.increaseViewsById(req.params.id);
    res.render("book", { book });
};

export const increaseCounter = async (req: Request, res: Response, next: NextFunction) => {
    switch (req.body.counter) {
        case "want": await Book.increaseWantClicksById(req.params.id); break;
        default: return next(new RequestError(400, "Bad counter name"));
    }
    res.json({ ok: true });
};

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next(new RequestError(400, "Image was not provided"));
    req.body.authors = JSON.parse(req.body.authors);

    const { error } = validateBook(req.body);
    if (error) {
        console.log(error.details);
        return next(new RequestError(400, "Book validation error", error.details)); 
    }
    

    const { generatedName } = await awsService.uploadImage(req.file);
    const book = new Book(
        req.body.bookTitle,
        req.body.about,
        `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${generatedName}`,
        req.body.bookYear,
        req.body.pages
    );
    await book.save();

    for (let author of req.body.authors) {
        const authorId = await Book.addAuthor(author);
        await book.addAssociation(authorId.toString());
    }

    res.status(201).json({ ok: true });
};

export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.id) return next();
    if (Number.isNaN(+req.query.id!)) return next(new RequestError(400, "ID must be a number"));

    const imageName = await Book.getImageNameById(req.query.id!.toString());
    await Book.deleteById(req.query.id!.toString());
    await awsService.deleteImage(imageName);

    res.status(200).json({ ok: true });
};

export const booksController = { getBookById, increaseCounter, addBook, deleteBookById };