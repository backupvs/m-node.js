import { Request, Response } from "express";
import storageService from "../services/storage.service";

export const sessionChecker = async (req: Request, res: Response, next: (err?: any) => any) => {
    if (!(req.session && req.session.userId)) return next();

    await findUserIndex(req.session.userId, async (err, index) => {
        if (err) return next(err);
        const storage = await storageService.getStorage();
        req.session.user = storage.users[index];
        req.session.user.pass = undefined;
        next();
    });
};

/**
 * Find index of item in storage by ID and run callbacks passing that index.
 * 
 * @param id Id to search.
 * @param callback Callback to call with error if item was not found.
 */
async function findUserIndex(id: number, callback: (err: Error | null, index: number) => void) {
    const storage = await storageService.getStorage();
    let error = null;
    let foundIndex = storage.users.findIndex(user => user.id === id);
    if (foundIndex === -1) {
        error = new Error(`The user with ID: "${id}" does not exist`);
    };
    callback(error, foundIndex);
}

export default sessionChecker;