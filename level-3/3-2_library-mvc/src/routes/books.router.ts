import { Router } from "express";
import { booksController } from "@controllers/books.controller";
import idValidator from "@middlewares/idValidator";
import multer from "multer";
import basicAuth from "@middlewares/basicAuth";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id", idValidator, booksController.getBookById);
router.patch("/:id", idValidator, booksController.increaseCounter);
router.post("/add", basicAuth, upload.single("bookImage"), booksController.addBook);
router.delete("/delete", basicAuth, booksController.deleteBook);

export default router;