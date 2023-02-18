import { Request, Response } from "express";
import Book from "@models/Book.model";
import awsService from "@services/aws.service";
import randomService from "@services/random.service"

export const getBookById = async (req: Request, res: Response) => {
    const [book] = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "non-existent id" });

    res.render("book", { book });
};

export const increaseCounter = async (req: Request, res: Response) => {
    switch(req.body.counter) {
        case "want": await Book.increaseWantClicksById(req.params.id); break;
        case "view": await Book.increaseViewsById(req.params.id); break;
        default: return res.status(400).json({ error: "bad counter" });
    }
    res.json({ ok: true });
};

export const addBook = async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: "image was not provided" });

    const imgName = randomService.getRandomName();
    await awsService.uploadImage(req.file, imgName);

    const book = new Book(
        req.body.bookTitle,
        req.body.about,
        req.body.author,
        `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${imgName}`,
        req.body.bookYear,
        req.body.pages
    );

    await book.save();

    res.status(201).redirect("http://localhost:3000/admin");
};

export default { getBookById, increaseCounter, addBook };