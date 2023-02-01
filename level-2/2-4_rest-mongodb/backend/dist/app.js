"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const response_time_1 = __importDefault(require("response-time"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./src/middlewares/logger"));
const v1_router_1 = __importDefault(require("./src/routes/v1.router"));
// Configuration constants
const app = (0, express_1.default)();
const port = 3005;
const SESSION_LIFETIME = 1000 * 60 * 60 * 2; // two hours
// Initialize file store for sessions
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
// Cookie config
const cookieConfig = {
    maxAge: SESSION_LIFETIME,
    secure: false
};
// CORS config
const corsConfig = {
    credentials: true,
    origin: "http://localhost:8080"
};
// Session config
const sessionConfig = {
    name: "sid",
    secret: 'the-most-secret-ever',
    resave: true,
    saveUninitialized: false,
    store: new FileStore,
    cookie: cookieConfig
};
// Middlewares
app.use((0, cors_1.default)(corsConfig));
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, response_time_1.default)());
app.use(logger_1.default);
app.use(body_parser_1.default.json());
// Routes
app.use("/api/v1", v1_router_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
