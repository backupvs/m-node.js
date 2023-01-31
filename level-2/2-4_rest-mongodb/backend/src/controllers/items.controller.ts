import { Request, Response } from "express";
import storageService from "../services/storage.service";
import { generateItemId } from "../services/storage.service";
import Item from "../models/item.model";

// Object to send as JSON after success deleting or updating
const success = { ok: true };

export const getItems = async (req: Request, res: Response) => {
    const storage = await storageService.getStorage();
    const items = storage.items.filter(item => item.ownerId === req.session.userId);
    res.json({ items: items });
}

export const createItem = async (req: Request, res: Response) => {
    const generatedId = await generateItemId();
    const storage = await storageService.getStorage();
    const newItem = new Item(req.body.text);
    storage.items.push({ ownerId: req.session.userId, id: generatedId, ...newItem.toJSON() });
    await storageService.updateStorage(storage);
    res.json({ id: generatedId });
}

export const deleteItem = async (req: Request, res: Response) => {
    const storage = await storageService.getStorage();
    findItemIndex(req.body.id, async (err, index) => {
        if (err) {
            console.error(err);
            return;
        }
        storage.items.splice(index, 1);
        await storageService.updateStorage(storage);
        res.json(success);
    });
}

export const updateItem = async (req: Request, res: Response) => {
    const storage = await storageService.getStorage();
    findItemIndex(req.body.id, async (err, index) => {
        if (err) console.error(err);
        storage.items[index].text = req.body.text;
        storage.items[index].checked = req.body.checked;
        await storageService.updateStorage(storage);
        res.json(success);
    });
}

/**
 * Find index of item in storage by ID and run callbacks passing that index.
 * 
 * @param id Id to search.
 * @param callback Callback to call with error if item was not found.
 */
async function findItemIndex(id: number, callback: (err: Error | null, index: number) => void) {
    const storage = await storageService.getStorage();
    let error = null;
    let foundIndex = storage.items.findIndex(item => item.id === id);
    if (foundIndex === -1) {
        error = new Error(`The item with ID: "${id}" does not exist`)
    };
    callback(error, foundIndex);
}

export default { getItems, createItem, deleteItem, updateItem };