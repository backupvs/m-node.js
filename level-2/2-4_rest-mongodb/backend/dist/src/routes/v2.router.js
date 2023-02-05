"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const items_controller_1 = __importDefault(require("../controllers/items.controller"));
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const register_controller_1 = __importDefault(require("../controllers/register.controller"));
const logout_controller_1 = __importDefault(require("../controllers/logout.controller"));
const login_required_1 = __importDefault(require("../middlewares/login-required"));
const v2 = (0, express_1.Router)();
const routes = {
    login: { controller: login_controller_1.default.login, loginRequired: false },
    register: { controller: register_controller_1.default.register, loginRequired: false },
    logout: { controller: logout_controller_1.default.logout, loginRequired: true },
    getItems: { controller: items_controller_1.default.getItems, loginRequired: true },
    deleteItem: { controller: items_controller_1.default.deleteItem, loginRequired: true },
    createItem: { controller: items_controller_1.default.createItem, loginRequired: true },
    editItem: { controller: items_controller_1.default.editItem, loginRequired: true }
};
v2.use(function (req, res, next) {
    const action = String(req.query.action);
    routes[action].loginRequired ? (0, login_required_1.default)(req, res, next) : next();
});
// const routerController = async (req: Request, res: Response) => {
//     const action = String(req.query.action);
//     if (routes[action]) {
//         routes[action].controller(req, res);
//     } else {
//         res.status(404).json({ error: "unknown query" });
//     }
// };
// v2.route("/router").post(routerController);
v2.route("/router").post((req, res) => {
    const action = String(req.query.action);
    if (routes[action]) {
        routes[action].controller(req, res);
    }
    else {
        res.status(404).json({ error: "unknown query" });
    }
});
exports.default = v2;
