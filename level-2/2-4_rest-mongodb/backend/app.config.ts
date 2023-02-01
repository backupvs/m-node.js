import session from "express-session";
import sessionFileStore from "session-file-store";
import cors from "cors";

export const SESSION_LIFETIME: number = 1000 * 60 * 60 * 2; // two hours

// Initialize file store for sessions
export const FileStore = sessionFileStore(session);

// Extend SessionData interface with new properties.
declare module "express-session" {
    interface SessionData {
        userId: number,
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
    origin: "http://localhost:8080"
};

// Session config
export const sessionConfig: session.SessionOptions = {
    name: "sid",
    secret: 'the-most-secret-ever',
    resave: true,
    saveUninitialized: false,
    store: new FileStore,
    cookie: cookieConfig
};