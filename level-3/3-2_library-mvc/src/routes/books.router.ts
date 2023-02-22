import { Router } from "express";
import { booksController } from "@controllers/books.controller";
import idValidator from "@middlewares/idValidator";
import multer from "multer";
import basicAuth from "@middlewares/basicAuth";
import catchErrors from "@middlewares/catchErrors";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/:id", idValidator, catchErrors(booksController.getBookById));
router.patch("/:id", idValidator, catchErrors(booksController.increaseCounter));
router.post("/add", basicAuth, upload.single("bookImage"), catchErrors(booksController.addBook));
router.delete("/delete", basicAuth, catchErrors(booksController.deleteBookById));

export default router;