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
const storage_service_1 = __importDefault(require("../services/storage.service"));
const storage_service_2 = require("../services/storage.service");
const item_model_1 = __importDefault(require("../models/item.model"));
// Object to send as JSON after success deleting or updating
const success = { ok: true };
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = yield storage_service_1.default.getStorage();
    res.json({ items: storage.items });
});
exports.getItems = getItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const generatedId = yield (0, storage_service_2.generateId)();
    const storage = yield storage_service_1.default.getStorage();
    const newItem = new item_model_1.default(req.body.text);
    storage.items.push(Object.assign({ id: generatedId }, newItem.toJSON()));
    yield storage_service_1.default.updateStorage(storage);
    res.json({ id: generatedId });
});
exports.createItem = createItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = yield storage_service_1.default.getStorage();
    // findItemIndex(req.body.id, async index => {
    //     storage.items.splice(index, 1);
    //     await storageService.updateStorage(storage);
    //     res.json(success);
    // });
    findItemIndex(req.body.id, (err, index) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return;
        }
        storage.items.splice(index, 1);
        yield storage_service_1.default.updateStorage(storage);
        res.json(success);
    }));
});
exports.deleteItem = deleteItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = yield storage_service_1.default.getStorage();
    // findItemIndex(req.body.id, async index => {
    //     storage.items[index].text = req.body.text;
    //     storage.items[index].checked = req.body.checked;
    //     await storageService.updateStorage(storage);
    //     res.json(success);
    // });
    findItemIndex(req.body.id, (err, index) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error(err);
            return;
        }
        storage.items[index].text = req.body.text;
        storage.items[index].checked = req.body.checked;
        yield storage_service_1.default.updateStorage(storage);
        res.json(success);
    }));
});
exports.updateItem = updateItem;
/**
 * Find index of item in storage by ID and run callbacks passing that index.
 *
 * @param id Id to search.
 * @param found Callback to run when item was found passing index as argument.
 * @param err Callback to run when item was not found.
 */
function findItemIndex(id, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield storage_service_1.default.getStorage();
        let error = null;
        let foundIndex = storage.items.findIndex(item => item.id === id);
        if (foundIndex === -1)
            error = new Error(`The item with ID: "${id}" does not exist`);
        callback(error, foundIndex);
    });
}
exports.default = { getItems: exports.getItems, createItem: exports.createItem, deleteItem: exports.deleteItem, updateItem: exports.updateItem };
