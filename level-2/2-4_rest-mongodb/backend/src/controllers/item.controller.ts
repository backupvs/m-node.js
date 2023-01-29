import { Request, Response } from "express";
import Item from "../models/item.model";

const itemsStorage: Item[] = [];

// Object to send as JSON after success deleting or updating
const success = { ok: true };

export const getItems = (req: Request, res: Response) => {
    res.json({ items: itemsStorage });
}

export const createItem = (req: Request, res: Response) => {
    let newItem = new Item(req.body.text);
    itemsStorage.push(newItem);
    res.json({ id: newItem.getId() });
}

export const deleteItem = (req: Request, res: Response) => {
    findItemIndex(req.body.id, index => {
        itemsStorage.splice(index, 1);
        res.json(success);
    });
}

export const updateItem = (req: Request, res: Response) => {
    findItemIndex(req.body.id, index => {
        itemsStorage[index].setText(req.body.text);
        itemsStorage[index].setChecked(req.body.checked);
        res.json(success);
    });
}

/**
 * Find index of item in storage by ID and run callbacks passing that index.
 * 
 * @param id Id to search.
 * @param found Callback to run when item was found passing index as argument.
 * @param err Callback to run when item was not found.
 */
function findItemIndex(id: number, found: (index: number) => void, err?: () => void) {
    let foundIndex = itemsStorage.findIndex(item => item.getId() === id);
    if (foundIndex !== -1) {
        found(foundIndex);
    } else {
        if (err) err();
    }
}

export default { getItems, createItem, deleteItem, updateItem };