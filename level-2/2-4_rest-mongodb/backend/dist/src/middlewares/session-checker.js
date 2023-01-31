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
exports.sessionChecker = void 0;
const storage_service_1 = __importDefault(require("../services/storage.service"));
const sessionChecker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req.session && req.session.userId))
        return next();
    yield findUserIndex(req.session.userId, (err, index) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(err);
        const storage = yield storage_service_1.default.getStorage();
        req.session.user = storage.users[index];
        req.session.user.pass = undefined;
        next();
    }));
});
exports.sessionChecker = sessionChecker;
/**
 * Find index of item in storage by ID and run callbacks passing that index.
 *
 * @param id Id to search.
 * @param callback Callback to call with error if item was not found.
 */
function findUserIndex(id, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = yield storage_service_1.default.getStorage();
        let error = null;
        let foundIndex = storage.users.findIndex(user => user.id === id);
        if (foundIndex === -1) {
            error = new Error(`The user with ID: "${id}" does not exist`);
        }
        ;
        callback(error, foundIndex);
    });
}
exports.default = exports.sessionChecker;
