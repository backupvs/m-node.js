import { MongoClient } from "mongodb";
import User from "../models/user.model";

// Initialize client
const client = new MongoClient(process.env.DATABASE_URI!);

// Get database
const database = client.db(process.env.DATABASE_NAME);

export const connect = async () => {
    try {
        await client.connect();
        console.log("[mongoDB] Connected successfully");
    } catch (err) {
        throw err;
    }
}

export const getUsersCollection = () => {
    return database.collection<User>("users");
}

export default { getUsersCollection, connect };