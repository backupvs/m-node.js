"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.createItem = exports.getItems = void 0;
const item_model_1 = __importDefault(require("../models/item.model"));
// Array of items
const itemsStorage = [];
const success = { ok: true };
// async if get from db or file.
const getItems = (req, res) => {
    res.json({ items: itemsStorage });
};
exports.getItems = getItems;
const createItem = (req, res) => {
    let newItem = new item_model_1.default(req.body.text);
    itemsStorage.push(newItem);
    res.json({ id: newItem.getId() });
};
exports.createItem = createItem;
const deleteItem = (req, res) => {
    findItemIndex(req.body.id, index => {
        itemsStorage.splice(index, 1);
        res.json(success);
    });
};
exports.deleteItem = deleteItem;
const updateItem = (req, res) => {
    findItemIndex(req.body.id, index => {
        itemsStorage[index].setText(req.body.text);
        itemsStorage[index].setChecked(req.body.checked);
        res.json(success);
    });
};
exports.updateItem = updateItem;
function findItemIndex(id, found, err) {
    let foundIndex = itemsStorage.findIndex(item => item.getId() === id);
    if (foundIndex !== -1) {
        found(foundIndex);
    }
    else {
        if (err)
            err();
    }
}
exports.default = { getItems: exports.getItems, createItem: exports.createItem, deleteItem: exports.deleteItem, updateItem: exports.updateItem };
