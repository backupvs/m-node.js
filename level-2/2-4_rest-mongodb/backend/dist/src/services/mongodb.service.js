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
exports.getUsersCollection = exports.connect = void 0;
const mongodb_1 = require("mongodb");
// Initialize client
const client = new mongodb_1.MongoClient(process.env.DATABASE_URI);
// Get database
const database = client.db(process.env.DATABASE_NAME);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("[mongoDB] Connected successfully");
    }
    catch (err) {
        throw err;
    }
});
exports.connect = connect;
const getUsersCollection = () => {
    return database.collection("users");
};
exports.getUsersCollection = getUsersCollection;
exports.default = { getUsersCollection: exports.getUsersCollection, connect: exports.connect };
