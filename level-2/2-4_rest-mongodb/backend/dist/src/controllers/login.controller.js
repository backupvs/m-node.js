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
exports.login = void 0;
const mongodb_service_1 = __importDefault(require("../services/mongodb.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const success = { ok: true };
const error = { error: "not found" };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }
    const requestLogin = req.body.login;
    const requestPass = req.body.pass;
    const users = mongodb_service_1.default.getUsersCollection();
    const user = yield users.findOne({ login: requestLogin });
    if (user) {
        const result = yield bcrypt_1.default.compare(requestPass, user.pass);
        if (result) {
            req.session.userId = user._id.toString();
            res.status(200).json(success);
        }
        else {
            res.status(400).json(error);
        }
    }
    else {
        res.status(400).json(error);
    }
});
exports.login = login;
exports.default = { login: exports.login };
