import { Router } from "express";
import { showBooks } from "@controllers/admin.controller";
import basicAuth from "@middlewares/basicAuth";

export const router = Router();

router.use(basicAuth);

router.get("/", showBooks);

export default router;