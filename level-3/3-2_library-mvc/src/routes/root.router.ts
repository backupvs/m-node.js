import { Router } from "express";
import { findBooks } from "@controllers/root.controller";
import paginationValidator from "@middlewares/paginationValidator";
import catchErrors from "@middlewares/catchErrors";

const router = Router();

router.use(paginationValidator);

router.get("/", catchErrors(findBooks));
router.get("/books", (req, res) => res.redirect("/"));

export default router;