"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const response_time_1 = __importDefault(require("response-time"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./src/middlewares/logger"));
const items_router_1 = __importDefault(require("./src/routes/items.router"));
const app = (0, express_1.default)();
const port = 3005;
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, response_time_1.default)());
app.use(logger_1.default);
//Routes
app.use("/api/v1", items_router_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
