import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { URI } from "./src/services/mongodb.service";

export const SESSION_LIFETIME: number = 1000 * 60 * 60 * 2; // two hours
export const PORT: number = 3005;

// Extend SessionData interface with new properties.
declare module "express-session" {
    interface SessionData {
        userId: string,
    }
}

// Cookie config
export const cookieConfig: session.CookieOptions = {
    maxAge: SESSION_LIFETIME,
    secure: false
};

// CORS config
export const corsConfig: cors.CorsOptions = {
    credentials: true,
    origin: [
        "http://localhost:8080"
    ]
};

// Session config
export const sessionConfig: session.SessionOptions = {
    name: "sid",
    secret: 'the-most-secret-ever',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: URI,
        dbName: "node-todo"
    }),
    cookie: cookieConfig
};