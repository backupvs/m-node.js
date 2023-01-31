"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controller_1 = __importDefault(require("../controllers/items.controller"));
const login_controller_1 = __importDefault(require("../controllers/login.controller"));
const register_controller_1 = __importDefault(require("../controllers/register.controller"));
const logout_controller_1 = __importDefault(require("../controllers/logout.controller"));
const login_required_1 = __importDefault(require("../middlewares/login-required"));
const v1 = (0, express_1.default)();
v1.route("/items")
    .get(login_required_1.default, items_controller_1.default.getItems)
    .post(login_required_1.default, items_controller_1.default.createItem)
    .delete(login_required_1.default, items_controller_1.default.deleteItem)
    .put(login_required_1.default, items_controller_1.default.updateItem);
v1.route("/login").post(login_controller_1.default.login);
v1.route("/register").post(register_controller_1.default.register);
v1.route("/logout").post(login_required_1.default, logout_controller_1.default.logout);
exports.default = v1;
