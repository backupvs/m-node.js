import { Router } from "express";   
import bookController from "@controllers/books.controller";

const router = Router();

router.get("/:id", bookController.getBookById);

export default router;