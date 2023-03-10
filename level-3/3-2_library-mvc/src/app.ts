import "module-alias/register";
import "dotenv/config";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import rootRouter from "@routes/root.router";
import booksRouter from "@routes/books.router";
import adminRouter from "@routes/admin.router";
import { checkMigration } from "@services/mysql2.service";
import { logger } from "@utils/logger.util";
import errorHandler from "@middlewares/errorHandler";
import renderNotFound from "@middlewares/renderNotFound";
import { scheduler } from "@services/scheduler.service";

const app = express();
const PORT = process.env.PORT || 3000;

// Static
app.use(express.static("src/public"));

// Middlewares
app.use(bodyParser.json());

// Views
app.set("views", path.join(process.cwd(), "src/views"));
app.set("view engine", "ejs");

// Routers
app.use("/", rootRouter);
app.use("/books", booksRouter);
app.use("/admin", adminRouter);

// Error handling
app.use(renderNotFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    logger.info(`Start listening on port ${PORT}`);
    await checkMigration();
    scheduler.start();
});