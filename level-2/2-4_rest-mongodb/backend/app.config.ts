import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";

// Extend SessionData interface with new properties.
declare module "express-session" {
    interface SessionData {
        userId: string,
    }
}

// Cookie config
export const cookieConfig: session.CookieOptions = {
    maxAge: +process.env.SESSION_LIFETIME!,
    secure: false
};

// CORS config
export const corsConfig: cors.CorsOptions = {
    credentials: true,
    origin: process.env.CORS_ORIGIN
};

// Session config
export const sessionConfig: session.SessionOptions = {
    name: "sid",
    secret: process.env.SESSION_SECRET!,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: process.env.DATABASE_URI,
        dbName: process.env.DATABASE_NAME
    }),
    cookie: cookieConfig
};