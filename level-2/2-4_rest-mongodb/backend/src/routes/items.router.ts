import Router from "express";
import itemController from "../controllers/item.controller";

const router = Router();

router.route("/items")
    .get(itemController.getItems)
    .post(itemController.createItem)
    .delete(itemController.deleteItem)
    .put(itemController.updateItem);

export default router;