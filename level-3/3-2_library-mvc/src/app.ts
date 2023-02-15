import "module-alias/register";
import "dotenv/config";
import path from "path";
import express from "express"; 
import bodyParser from "body-parser";
import rootRouter from "@routes/root.router";
import booksRouter from "@routes/books.router";

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

app.listen(PORT, () => {
    console.log(`Start listening on port ${PORT}`);
});