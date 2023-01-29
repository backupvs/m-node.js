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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.updateStorage = exports.getStorage = void 0;
const promises_1 = require("fs/promises");
const STORAGE_PATH = __dirname + "../../../../storage.json";
function readStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        let buffer = yield (0, promises_1.readFile)(STORAGE_PATH);
        let storage = JSON.parse(buffer.toString());
        return storage;
    });
}
function getStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        let storage = yield readStorage();
        return storage;
    });
}
exports.getStorage = getStorage;
function updateStorage(updatedStorage) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, promises_1.writeFile)(STORAGE_PATH, JSON.stringify(updatedStorage));
    });
}
exports.updateStorage = updateStorage;
// Generate ID and update storage with new incremented ID.
function generateId() {
    return __awaiter(this, void 0, void 0, function* () {
        let storage = yield getStorage();
        console.log(storage);
        let id = storage.id++;
        console.log(storage);
        console.log("ID", id);
        yield updateStorage(storage);
        let updstr = yield getStorage();
        console.log("updstr", updstr);
        return id;
    });
}
exports.generateId = generateId;
exports.default = { updateStorage, getStorage };
