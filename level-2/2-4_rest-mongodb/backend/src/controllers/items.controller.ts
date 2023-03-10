import { Request, Response } from "express";
import Item from "../models/item.model";
import database from "../services/mongodb.service";
import { ObjectId } from "mongodb";

// Object to send as JSON after success deleting or updating
const success = { ok: true };

// Get collection of users from database
const users = database.getUsersCollection();

// Get user by id from database and send his items array as json
export const getItems = async (req: Request, res: Response) => {
    const user = await users.findOne({ _id: new ObjectId(req.session.userId) });
    res.json({ items: user?.items });
}

// Create item from request body and push it to current user's items array
export const createItem = async (req: Request, res: Response) => {
    const newItem = new Item(req.body.text);
    await users.updateOne(
        { _id: new ObjectId(req.session.userId) },
        { $push: { items: newItem } }
    );
    res.json({ id: newItem._id.toString() });
}

// Get user by id from database and delete requested item by id
export const deleteItem = async (req: Request, res: Response) => {
    await users.updateOne(
        { _id: new ObjectId(req.session.userId) },
        { $pull: { items: { _id: new ObjectId(req.body.id) } } }
    );
    res.json(success);
}

// Get user and requested item by id and change requested properties
export const editItem = async (req: Request, res: Response) => {
    await users.updateOne(
        { _id: new ObjectId(req.session.userId), "items._id": new ObjectId(req.body.id) },
        { $set: {
            "items.$.text": req.body.text,
            "items.$.checked": req.body.checked
        }}
    );
    res.json(success);
}

export default { getItems, createItem, deleteItem, editItem };