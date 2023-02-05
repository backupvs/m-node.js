"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
require("dotenv/config");
const config = __importStar(require("./app.config"));
const response_time_1 = __importDefault(require("response-time"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./src/middlewares/logger"));
const v1_router_1 = __importDefault(require("./src/routes/v1.router"));
const v2_router_1 = __importDefault(require("./src/routes/v2.router"));
const mongodb_service_1 = __importDefault(require("./src/services/mongodb.service"));
// Initialize express app
const app = (0, express_1.default)();
// Try to connect to mongoDB
mongodb_service_1.default.connect();
// Middlewares
app.use((0, cors_1.default)(config.corsConfig));
app.use((0, express_session_1.default)(config.sessionConfig));
app.use((0, response_time_1.default)());
app.use(logger_1.default);
app.use(body_parser_1.default.json());
// Routes
app.use("/api/v1", v1_router_1.default);
app.use("/api/v2", v2_router_1.default);
// Start listen requests
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
