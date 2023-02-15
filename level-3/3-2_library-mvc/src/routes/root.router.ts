import { Router } from "express";
import rootController from "@controllers/root.controller";

const router = Router();

router.get("/", rootController.getAllBooks)
router.get("/books", (req, res) => res.redirect("/"));

export default router;