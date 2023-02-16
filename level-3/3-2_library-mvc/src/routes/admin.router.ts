import { Router } from "express";
import adminController from "@controllers/admin.controller";
import basicAuth from "@middlewares/basicAuth";

export const router = Router();

router.use(basicAuth);

router.get("/", adminController.showAdminPanel);

export default router;