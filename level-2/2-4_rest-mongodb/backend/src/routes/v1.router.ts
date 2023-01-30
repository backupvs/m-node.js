import Router from "express";
import itemController from "../controllers/items.controller";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import logoutController from "../controllers/logout.controller";

const v1 = Router();

v1.route("/items")
    .get(itemController.getItems)
    .post(itemController.createItem)
    .delete(itemController.deleteItem)
    .put(itemController.updateItem);

v1.route("/login").post(loginController.login);

v1.route("/register").post(registerController.register);

v1.route("/logout").post(logoutController.logout);

export default v1;