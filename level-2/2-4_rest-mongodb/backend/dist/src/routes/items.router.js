"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const router = (0, express_1.default)();
router.route("/items")
    .get(item_controller_1.default.getItems)
    .post(item_controller_1.default.createItem)
    .delete(item_controller_1.default.deleteItem)
    .put(item_controller_1.default.updateItem);
exports.default = router;
