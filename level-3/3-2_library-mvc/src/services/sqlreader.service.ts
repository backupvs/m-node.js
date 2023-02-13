import path from "path";
import fs from "fs/promises";

/**
 * Reads .sql file and returns query as string in one line.
 * 
 * @param filename Name of .sql file
 * @returns Valid SQL query string.
 */
export async function getQueryFrom(filename: string) {
    const file = await fs.readFile(path.join(process.env.SQL_QUERIES_PATH!, filename + ".sql"));
    return file.toString().replace(/(\r\n|\n|\r)/gm," ");
}

export default { getQueryFrom }
