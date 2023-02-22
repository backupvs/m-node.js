import { Router } from "express";
import { showBooks } from "@controllers/admin.controller";
import basicAuth from "@middlewares/basicAuth";
import catchErrors from "@middlewares/catchErrors";

export const router = Router();

router.use(basicAuth);

router.get("/", catchErrors(showBooks));

export default router;