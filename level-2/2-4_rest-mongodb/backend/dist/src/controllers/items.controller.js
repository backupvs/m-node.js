"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.createItem = exports.getItems = void 0;
const item_model_1 = __importDefault(require("../models/item.model"));
const mongodb_service_1 = __importDefault(require("../services/mongodb.service"));
const mongodb_1 = require("mongodb");
// Object to send as JSON after success deleting or updating
const success = { ok: true };
// Get collection of users from database
const users = mongodb_service_1.default.getUsersCollection();
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users.findOne({ _id: new mongodb_1.ObjectId(req.session.userId) });
    res.json({ items: user === null || user === void 0 ? void 0 : user.items });
});
exports.getItems = getItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new item_model_1.default(req.body.text);
    yield users.updateOne({ _id: new mongodb_1.ObjectId(req.session.userId) }, { $push: { items: newItem } });
    res.json({ id: newItem._id.toString() });
});
exports.createItem = createItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield users.updateOne({ _id: new mongodb_1.ObjectId(req.session.userId) }, { $pull: { items: { _id: new mongodb_1.ObjectId(req.body.id) } } });
    res.json(success);
});
exports.deleteItem = deleteItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id:", req.body.id);
    console.log("text:", req.body.text);
    console.log("checked:", req.body.checked);
    yield users.updateOne({ _id: new mongodb_1.ObjectId(req.session.userId), "items._id": new mongodb_1.ObjectId(req.body.id) }, { $set: {
            "items.$.text": req.body.text,
            "items.$.checked": req.body.checked
        } });
    res.json(success);
});
exports.updateItem = updateItem;
exports.default = { getItems: exports.getItems, createItem: exports.createItem, deleteItem: exports.deleteItem, updateItem: exports.updateItem };
