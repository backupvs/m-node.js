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
exports.generateUserId = exports.generateItemId = exports.updateStorage = exports.getStorage = void 0;
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const STORAGE_PATH = __dirname + "../../../../storage.json";
// Read storage if it exists, create it otherwise
function readStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, promises_1.access)(STORAGE_PATH, fs_1.constants.F_OK);
        }
        catch (err) {
            console.error("Storage doesn't exist. Creating storage...");
            yield createStorage();
        }
        const buffer = yield (0, promises_1.readFile)(STORAGE_PATH);
        const storage = JSON.parse(buffer.toString());
        return storage;
    });
}
// Initialize new storage and creates it
function createStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        const initStorage = {
            nextItemId: 1,
            nextUserId: 1,
            items: [],
            users: []
        };
        yield updateStorage(initStorage);
        console.log("Storage created successfuly");
    });
}
// Read storage and return it as StorageType
function getStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield readStorage();
        return storage;
    });
}
exports.getStorage = getStorage;
// Rewrite storage
function updateStorage(updatedStorage) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, promises_1.writeFile)(STORAGE_PATH, JSON.stringify(updatedStorage));
    });
}
exports.updateStorage = updateStorage;
// Generate ID for item and update storage with new incremented ID.
function generateItemId() {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield getStorage();
        const id = storage.nextItemId++;
        yield updateStorage(storage);
        return id;
    });
}
exports.generateItemId = generateItemId;
// Generate ID for user and update storage with new incremented ID.
function generateUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield getStorage();
        const id = storage.nextUserId++;
        yield updateStorage(storage);
        return id;
    });
}
exports.generateUserId = generateUserId;
exports.default = { updateStorage, getStorage };
