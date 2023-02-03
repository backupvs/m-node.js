"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongodb_1 = require("mongodb");
class User {
    constructor(login, pass) {
        this._id = new mongodb_1.ObjectId();
        this.login = login;
        this.pass = pass;
        this.items = [];
    }
}
exports.User = User;
exports.default = User;
