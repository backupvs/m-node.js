import { Request, Response, Router } from "express";
import itemsController from "../controllers/items.controller";
import loginController from "../controllers/login.controller";
import registerController from "../controllers/register.controller";
import logoutController from "../controllers/logout.controller";
import loginRequired from "../middlewares/login-required";

const v2 = Router();

const routes: Record<string, { controller: Function, loginRequired: boolean }> = {
    login: { controller: loginController.login, loginRequired: false },
    register: { controller: registerController.register, loginRequired: false },
    logout: { controller: logoutController.logout, loginRequired: true },
    getItems: { controller: itemsController.getItems, loginRequired: true },
    deleteItem: { controller: itemsController.deleteItem, loginRequired: true },
    createItem: { controller: itemsController.createItem, loginRequired: true },
    editItem: { controller: itemsController.editItem, loginRequired: true }
};

////////// REQ QUERY PARSER TO MAKE SHORTER


v2.use(function (req, res, next) {
    const action = String(req.query.action);
    routes[action].loginRequired ? loginRequired(req, res, next) : next();
});

v2.route("/router").post((req, res) => {
    const action = String(req.query.action);

    if (routes[action]) {
        routes[action].controller(req, res);
    } else {
        res.status(404).json({ error: "unknown query" });
    }
});

export default v2;