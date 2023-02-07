import express from "express"
import bodyParser from "body-parser";

const app = express();

app.use(express.static("static"));
app.use(bodyParser.json());

enum Button {
    Plus,
    Minus
}

const clicks: Button[] = [];

app.post("/plus", (req, res) => {
    clicks.push(req.body.btn);
    res.json({
        count: clicks.filter(btn => btn === Button.Plus).length,
    });
});

app.post("/minus", (req, res) => {
    clicks.push(req.body.btn);
    res.json({
        count: clicks.filter(btn => btn === Button.Minus).length,
    });
});

app.listen(3000, () => {
    console.log("listening 3000");
});