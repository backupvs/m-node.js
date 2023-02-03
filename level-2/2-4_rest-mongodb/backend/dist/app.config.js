"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = exports.corsConfig = exports.cookieConfig = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// Cookie config
exports.cookieConfig = {
    maxAge: +process.env.SESSION_LIFETIME,
    secure: false
};
// CORS config
exports.corsConfig = {
    credentials: true,
    origin: process.env.CORS_ORIGIN
};
console.log(process.env.CORS_ORIGIN_URL);
// Session config
exports.sessionConfig = {
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new connect_mongo_1.default({
        mongoUrl: process.env.DATABASE_URI,
        dbName: process.env.DATABASE_NAME
    }),
    cookie: exports.cookieConfig
};
