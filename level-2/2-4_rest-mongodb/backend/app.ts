import express from "express";
import cors from "cors";
import session from "express-session";
import sessionFileStore from "session-file-store";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import sessionChecker from "./src/middlewares/session-checker";
import v1 from "./src/routes/v1.router";
import Item from "./src/models/item.model";

// Configuration constants
const app: express.Express = express();
const port: number = 3005;
const SESSION_LIFETIME: number = 1000 * 60 * 60 * 2; // two hours

// Initialize file store for sessions
const FileStore = sessionFileStore(session);

// Cookie config
const cookieConfig: session.CookieOptions = {
    maxAge: SESSION_LIFETIME,
    secure: false
};

// CORS config
const corsConfig: cors.CorsOptions = {
    credentials: true,
    origin: "http://localhost:8080"
};

// Session config
const sessionConfig: session.SessionOptions = {
    name: "sid",
    secret: 'the-most-secret-ever',
    resave: true,
    saveUninitialized: false,
    store: new FileStore,
    cookie: cookieConfig
};

// Extend SessionData interface with new properties.
declare module "express-session" {
    interface SessionData {
        userId: number,
        user: any // todo model
    }
}

// Middlewares
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(sessionChecker);
app.use(responseTime());
app.use(logger);
app.use(bodyParser.json());

// Routes
app.use("/api/v1", v1);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
