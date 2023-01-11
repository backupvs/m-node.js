/* Imports */
import express from "express";

/* Constants */
const app = express();
const port = 3000;

let counter = 0;

/* Handlers */
app.get("/", (req, res) => {
    res.send(`${++counter}`);
});

/* Start to listen */
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});