import { readFile, writeFile, access } from "fs/promises";
import { constants } from "fs";

const STORAGE_PATH: string = __dirname + "../../../../storage.json";

// Type of storage JSON file to be able write typed objects.
type StorageType = {
    nextItemId: number,
    nextUserId: number
    items: [
        {
            ownerId: number,
            id: number,
            text: string,
            checked: boolean
        }
    ]
    users: [
        {
            id: number
            login: string,
            pass: string, // TODO hash
        }
    ]
};

// Read storage if it exists, create it otherwise
async function readStorage() {
    try {
        await access(STORAGE_PATH, constants.F_OK);
    } catch (err) {
        console.error("Storage doesn't exist. Creating storage...");
        await createStorage();
    }

    const buffer = await readFile(STORAGE_PATH);
    const storage = JSON.parse(buffer.toString());

    return storage;
}

// Initialize new storage and creates it
async function createStorage() {
    const initStorage: any = {
        nextItemId: 1,
        nextUserId: 1,
        items: [],
        users: []
    }
    await updateStorage(initStorage as StorageType);
    console.log("Storage created successfuly");
}

// Read storage and return it as StorageType
export async function getStorage(): Promise<StorageType> {
    const storage = await readStorage();

    return storage as StorageType;
}

// Rewrite storage
export async function updateStorage(updatedStorage: StorageType) {
    writeFile(STORAGE_PATH, JSON.stringify(updatedStorage));
}

// Generate ID for item and update storage with new incremented ID.
export async function generateItemId() {
    const storage = await getStorage();
    const id = storage.nextItemId++;
    await updateStorage(storage);

    return id;
}

// Generate ID for user and update storage with new incremented ID.
export async function generateUserId() {
    const storage = await getStorage();
    const id = storage.nextUserId++;
    await updateStorage(storage);

    return id;
}

export default { updateStorage, getStorage };