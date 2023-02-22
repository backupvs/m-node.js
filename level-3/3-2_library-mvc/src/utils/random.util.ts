import crypto from "crypto";

export const getRandomName = (bytes: number = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
}

export default { getRandomName };