import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import * as config from "./app.config";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import v1 from "./src/routes/v1.router";
import v2 from "./src/routes/v2.router";
import database from "./src/services/mongodb.service";

// Initialize express app
const app: express.Express = express();

// Try to connect to mongoDB
database.connect();

// Middlewares
app.use(cors(config.corsConfig));
app.use(session(config.sessionConfig));
app.use(responseTime());
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use("/api/v1", v1);
app.use("/api/v2", v2);

// Start listen requests
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
