import mysql, { RowDataPacket } from "mysql2/promise";
import { getQueryFrom } from "@utils/sqlreader.util";
import { logger } from "@utils/logger.util";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true
});

// Check if migration has been applied, if not - applies it.
export const checkMigration = async () => {
    logger.info("Checking database version...");
    try {
        const authorsTableExists = await checkAuthors();
        const authorColumnExists = await checkAuthorColumnInBooks();
        const authorsBooksTableExists = await checkAuthorsBooks();

        if (!authorsTableExists && authorColumnExists && !authorsBooksTableExists) {
            await migrate();
        } else {
            logger.info("The database has already been migrated")
        }
    } catch (error) {
        logger.error(error);
    }
}

async function migrate() {
    logger.info("Start migrating database...")
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
    logger.info("Database was successefully migrated")
}

// Check existence of authors table
async function checkAuthors() {
    logger.info("Checking existence of authors table...");
    let authors = await pool.execute<RowDataPacket[]>("SHOW TABLES LIKE 'authors'");
    return authors[0].length > 0;
}

// Check existence of authors_books table
async function checkAuthorsBooks() {
    logger.info("Checking existence of authors_books table...");
    let authorsBooks = await pool.execute<RowDataPacket[]>("SHOW TABLES LIKE 'authors_books'");
    return authorsBooks[0].length > 0;
}

// Check existence of author column in books table
async function checkAuthorColumnInBooks() {
    logger.info("Checking existence of author column in books table...");
    let [booksColumns] = await pool.execute<RowDataPacket[]>("DESCRIBE books");
    if (Array.isArray(booksColumns)) {
        if (booksColumns.find(column => column["Field"] === "author")) {
            return true;
        }
    }

    return false;
}


export default pool;