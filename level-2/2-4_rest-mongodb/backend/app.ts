import express from "express";
import cors from "cors";
import session from "express-session";
import * as config from "./app.config";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import v1 from "./src/routes/v1.router";
import database from "./src/services/mongodb.service";

// Configuration constants
const app: express.Express = express();

// Middlewares
app.use(cors(config.corsConfig));
app.use(session(config.sessionConfig));
app.use(responseTime());
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use("/api/v1", v1);

// Try to connect to mongoDB
database.connect();

// Start listen requests
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}`);
});
