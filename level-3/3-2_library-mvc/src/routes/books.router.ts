import { Router } from "express";
import bookController from "@controllers/books.controller";
import idValidator from "@middlewares/idValidator";

const router = Router();

router.use("/:id", idValidator);

router.get("/:id", bookController.getBookById);
router.patch("/:id", bookController.increaseCounter)

export default router;