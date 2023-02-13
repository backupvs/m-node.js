import db from "@configs/db.config";
import sqlReader from "@services/sqlreader.service";

export class Book {
    constructor(
        public title: string,
        public about: string,
        public author: string,
        public image_url: string,
        public release_year: string
    ) {}

    /**
     * Makes query to db to get books 
     * with specified offset and limit.
     * 
     * @param offset Offset from first book. 0 by default
     * @param limit Number of books to get. Value from environment variable by default
     * @returns 
     */
    static async findAll(offset: number = 0, limit: number = +process.env.BOOKS_LIMIT!) {
        const [books] = await db.execute(
            await sqlReader.getQueryFrom("selectBooksWithLimit"),
            [offset.toString(), limit.toString()]
        );

        return books;
    }

    /**
     * Makes query to db to count all books.
     * 
     * @returns Promise of getting number of all books
     */
    static async getNumberOfAll() {
        const [countResult] = await db.execute(await sqlReader.getQueryFrom("getBooksCount"));
        return countResult[0]["COUNT(*)"];
    }
}

export default Book; 