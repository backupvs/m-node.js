import { MongoClient } from "mongodb";
import User from "../models/user.model";

// URI to connect to mongodb
export const URI = "<your mongodb uri>";

// Initialize client
const client = new MongoClient(URI);

// Get database
const database = client.db("node-todo");


/// LOGS FOR EVENTS FROM DB AND SESSIONS


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