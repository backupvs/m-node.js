import db from "@configs/db.config";
import sqlReader from "@services/sqlreader.service";

export class Book {
    constructor(
        public id: number,
        public title: string,
        public about: string,
        public author: string,
        public image_url: string,
        public release_year: number
    ) {}

    /**
     * Makes query to db to get books 
     * with specified offset and limit.
     * 
     * @param offset Offset from first book. 0 by default
     * @param limit Number of books to get. Value from environment variable by default
     * @returns Promise to get array of all books.
     */
    static async findAll(offset: number = 0, limit: number = +process.env.BOOKS_LIMIT!) {
        const [books] = await db.execute(
            await sqlReader.getQueryFrom("selectBooksWithLimit"),
            [offset.toString(), limit.toString()]
        );

        return books;
    }

    /**
     * Makes query to db to get.
     * 
     * @param id Requested id.
     * @returns Promise to get book by requested id.
     */
    static async findById(id: string) {
        const [book] = await db.execute(
            await sqlReader.getQueryFrom("getBookById"),
            [id]
        );

        return book;
    }
    
    /**
     * Makes query to db to count all books.
     * 
     * @returns Promise to get number of all books.
     */
    static async getNumberOfAll() {
        const [countResult] = await db.execute(await sqlReader.getQueryFrom("getBooksCount"));
        return countResult[0]["COUNT(*)"];
    }

    /**
     * Increments views count of book by id.
     * 
     * @param id Requested id.
     * @returns Promise to increment views count.
     */
    static async increaseViewsById(id: string) {
        return db.execute(
            await sqlReader.getQueryFrom("increaseViewsCount"),
            [id]
        );
    }

    /**
     * Increments want button clicks count of book by id.
     * 
     * @param id Requested id.
     * @returns Promise to increment want button clicks count.
     */
    static async increaseWantClicksById(id: string) {
        return db.execute(
            await sqlReader.getQueryFrom("increaseWantClicksCount"),
            [id]
        );
    }
}

export default Book; 