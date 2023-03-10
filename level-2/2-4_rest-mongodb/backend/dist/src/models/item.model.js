"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const mongodb_1 = require("mongodb");
class Item {
    constructor(text) {
        this._id = new mongodb_1.ObjectId();
        this.text = text;
        this.checked = false;
    }
}
exports.Item = Item;
exports.default = Item;
