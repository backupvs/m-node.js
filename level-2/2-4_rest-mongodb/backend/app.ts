import express from "express";
import cors from "cors";
import session from "express-session";
import * as config from "./app.config";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import v1 from "./src/routes/v1.router";

// Configuration constants
const app: express.Express = express();
const port: number = 3005;

// Middlewares
app.use(cors(config.corsConfig));
app.use(session(config.sessionConfig));
app.use(responseTime());
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use("/api/v1", v1);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
