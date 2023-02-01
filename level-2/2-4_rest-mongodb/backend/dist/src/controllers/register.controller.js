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
const storage_service_1 = __importDefault(require("../services/storage.service"));
const storage_service_2 = require("../services/storage.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const success = { ok: true };
const saltRounds = 10;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.userId) {
        return res.status(400).json({ error: "already logged in" });
    }
    const login = req.body.login;
    const pass = req.body.pass;
    const generatedId = yield (0, storage_service_2.generateUserId)();
    const storage = yield storage_service_1.default.getStorage();
    const index = storage.users.findIndex(user => user.login === login);
    if (index !== -1) {
        return res.status(400).json({ error: "login already exists" });
    }
    // TODO model User
    storage.users.push({
        id: generatedId,
        login: login,
        pass: yield bcrypt_1.default.hash(pass, 10) // TODO hash
    });
    yield storage_service_1.default.updateStorage(storage);
    res.json(success);
});
exports.register = register;
exports.default = { register: exports.register };
