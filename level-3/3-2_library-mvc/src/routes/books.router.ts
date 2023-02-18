import { Router } from "express";
import bookController from "@controllers/books.controller";
import idValidator from "@middlewares/idValidator";
import multer from "multer";
import basicAuth from "@middlewares/basicAuth";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/:id", idValidator, bookController.getBookById);
router.patch("/:id", idValidator, bookController.increaseCounter);
router.post("/add", basicAuth, upload.single("bookImage"), bookController.addBook);

export default router;