import mysql, { RowDataPacket } from "mysql2/promise";
import { getQueryFrom } from "./sqlreader.service";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true
});

// Check if migration has been applied, if not - applies it.
export const checkMigration = async () => {
    const authorsTableExists = await checkAuthors();
    const authorColumnExists = await checkAuthorColumnInBooks();
    const authorsBooksTableExists = await checkAuthorsBooks();

    try {
        if (!authorsTableExists && authorColumnExists && !authorsBooksTableExists) {
            // Step 1. Create the "authors" table
            await pool.execute(await getQueryFrom("migration/createAuthorsTable"));
            // Step 2. Insert author names into the "authors" table, splitting by comma
            await pool.execute(await getQueryFrom("migration/extractAuthors"));
            // Step 3. Create "authors_books" table
            await pool.execute(await getQueryFrom("migration/createAuthorsBooksTable"));
            // Step 4. Insert data into the "authors_books" table
            await pool.execute(await getQueryFrom("migration/insertAssociations"));
            // Step 5. Remove the "author" column from the "books" table
            await pool.execute(await getQueryFrom("migration/removeAuthorFromBooksTable"));
        }
    } catch (error) {
        console.error(error);
    }
}

// Check existence of authors table
async function checkAuthors() {
    let authors = await pool.execute<RowDataPacket[]>("SHOW TABLES LIKE 'authors'");
    return authors[0].length > 0;
}

// Check existence of authors_books table
async function checkAuthorsBooks() {
    let authorsBooks = await pool.execute<RowDataPacket[]>("SHOW TABLES LIKE 'authors_books'");
    return authorsBooks[0].length > 0;
}

// Check existence of author column in books table
async function checkAuthorColumnInBooks() {
    let [booksColumns] = await pool.execute<RowDataPacket[]>("DESCRIBE books");
    if (Array.isArray(booksColumns)) {
        if (booksColumns.find(column => column["Field"] === "author")) {
            return true;
        }
    }

    return false;
}


export default pool;