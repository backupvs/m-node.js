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
exports.register = void 0;
const mongodb_service_1 = __importDefault(require("../services/mongodb.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const success = { ok: true };
const saltRounds = 10;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }
    const requestLogin = req.body.login;
    const requestPass = req.body.pass;
    const users = mongodb_service_1.default.getUsersCollection();
    const user = yield users.findOne({ login: requestLogin });
    if (user) {
        return res.status(400).json({ error: "login already exists" });
    }
    users.insertOne(new user_model_1.default(requestLogin, yield bcrypt_1.default.hash(requestPass, saltRounds)));
    res.status(201).json(success);
});
exports.register = register;
exports.default = { register: exports.register };
