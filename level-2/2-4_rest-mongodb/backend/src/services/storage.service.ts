import { readFile, writeFile } from "fs/promises";

const STORAGE_PATH: string = __dirname + "../../../../storage.json";

type StorageType = {
    id: number,
    items: [
        {
            id: number,
            text: string,
            checked: boolean
        }
    ]
};

async function readStorage() {
    let buffer = await readFile(STORAGE_PATH);
    let storage = JSON.parse(buffer.toString());

    return storage;
}

export async function getStorage(): Promise<StorageType> {
    let storage = await readStorage();

    return storage as StorageType;
}

export async function updateStorage(updatedStorage: StorageType) {
    writeFile(STORAGE_PATH, JSON.stringify(updatedStorage));
}

// Generate ID and update storage with new incremented ID.
export async function generateId() {
    let storage = await getStorage();
    let id = storage.id++;
    await updateStorage(storage);

    return id;
}

export default { updateStorage, getStorage };