"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = exports.corsConfig = exports.cookieConfig = exports.PORT = exports.SESSION_LIFETIME = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const mongodb_service_1 = require("./src/services/mongodb.service");
exports.SESSION_LIFETIME = 1000 * 60 * 60 * 2; // two hours
exports.PORT = 3005;
// Cookie config
exports.cookieConfig = {
    maxAge: exports.SESSION_LIFETIME,
    secure: false
};
// CORS config
exports.corsConfig = {
    credentials: true,
    origin: [
        "http://localhost:8080"
    ]
};
// Session config
exports.sessionConfig = {
    name: "sid",
    secret: 'the-most-secret-ever',
    resave: true,
    saveUninitialized: false,
    store: new connect_mongo_1.default({
        mongoUrl: mongodb_service_1.URI,
        dbName: "node-todo"
    }),
    cookie: exports.cookieConfig
};
