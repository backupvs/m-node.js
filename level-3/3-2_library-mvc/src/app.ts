import "module-alias/register";
import "dotenv/config";
import path from "path";
import express from "express";
import booksRouter from "@routes/books.router";

const app = express();
const PORT = process.env.PORT || 3000;

// Static
app.use(express.static("src/public"));

// Views
app.set("views", path.join(process.cwd(), "src/views"));
app.set("view engine", "ejs");

// Routers
app.use("/", booksRouter);

app.listen(PORT, () => {
    console.log(`Start listening on port ${PORT}`);
});