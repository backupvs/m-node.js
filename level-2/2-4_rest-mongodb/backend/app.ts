import express from "express";
import cors from "cors";
import session from "express-session";
import sessionFileStore from "session-file-store";
import responseTime from "response-time";
import bodyParser from "body-parser";
import logger from "./src/middlewares/logger";
import v1 from "./src/routes/v1.router";

// Configuration constants
const app: express.Express = express();
const port: number = 3005;
const SESSION_LIFETIME: number = 1000 * 60 * 60 * 2;

// CORS
app.use(cors({
  credentials: true,
  origin: "http://localhost:8080"
}));

// Add property userId to sessions
declare module "express-session" {
  interface SessionData {
    userId: number
  }
}

// Initialize file store for sessions
const FileStore = sessionFileStore(session);

// Session
app.use(session({
  name: "sid",
  secret: 'the-most-secret-ever',
  resave: true,
  saveUninitialized: true,
  store: new FileStore,
  cookie: { maxAge: 3600000, secure: false }
}));

// Middlewares
app.use(bodyParser.json());
app.use(responseTime());
app.use(logger);

// Routes
app.use("/api/v1", v1);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
