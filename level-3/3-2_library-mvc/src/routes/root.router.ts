import { Router } from "express";
import { findBooks } from "@controllers/root.controller";
import paginationValidator from "@middlewares/paginationValidator";

const router = Router();

router.use(paginationValidator);

router.get("/", findBooks)
router.get("/books", (req, res) => res.redirect("/"));

export default router;