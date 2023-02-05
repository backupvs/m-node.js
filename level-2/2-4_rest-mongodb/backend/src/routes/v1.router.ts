import Router from "express";
import itemController from "../controllers/items.controller";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import logoutController from "../controllers/logout.controller";
import loginRequired from "../middlewares/login-required";

const v1 = Router();

v1.route("/items")
    .get(loginRequired, itemController.getItems)
    .post(loginRequired, itemController.createItem)
    .delete(loginRequired, itemController.deleteItem)
    .put(loginRequired, itemController.editItem);

v1.route("/login").post(loginController.login);

v1.route("/register").post(registerController.register);

v1.route("/logout").post(loginRequired, logoutController.logout);

export default v1;