import express from "express";
import cors from "cors";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import items from "./src/routes/items.router";

const app: express.Express = express();
const port: number = 3005;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(responseTime());
app.use(logger);

//Routes
app.use("/api/v1", items);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
