import db from "@services/db.service";
import { getQueryFrom } from "@services/sqlreader.service";
import { RowDataPacket } from "mysql2/promise";

/**
 * Represents a book entry in database.
 */
export class Book {
    constructor(
        public title: string,
        public about: string,
        public author: string,
        public image_url: string,
        public release_year: number,
        public pages: number
    ) {}

    /**
     * Makes query to db to create book.
     * 
     * @returns Promise to create book.
     */
    async save() {
        return db.execute(
            await getQueryFrom("createBook"),
            [
                this.title,
                this.about,
                this.author,
                this.image_url,
                this.release_year.toString(),
                this.pages.toString()
            ]
        );
    }

    /**
     * Makes query to db to get book by id.
     * 
     * @param id Requested id.
     * @returns Promise to get book by requested id.
     */
    static async findById(id: string) {
        const [book] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("getBookById"),
            [id]
        );

        return book;
    }

    /**
     * Makes query to db to delete book by id.
     * 
     * @param id Requested id.
     * @returns Promise to delete book.
     */
    static async deleteById(id: string) {
        return db.execute<RowDataPacket[]>(
            await getQueryFrom("deleteBookById"),
            [id]
        );
    }

    /**
     * Finds books by specified parameters 
     * and returns with specified offset and limit.
     * 
     * @param search Search string.
     * @param author Author to search by.
     * @param releaseYear Release year to search by.
     * @param offset Offset from first book.
     * @param limit Number of books to get.
     * @returns Promise to get array of books by search parameters
     */
    static async find(search: string, author: string, releaseYear: string, 
        offset: string,
        limit: string
        ) {
        const [result] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("findBook"),
            { search, author, releaseYear, offset, limit }
        );

        return result;
    }

    /**
     * Makes query to db to get all books
     * and returns array with specified offset and limit.
     * 
     * @returns Array of all books.
     */
    static async getAllBooks(offset: string, limit: string) {
        const [books] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("getAllBooks"),
            { offset, limit }
        );

        return books;
    }
    
    /**
     * Makes query to db to count all books.
     * 
     * @returns Promise to get number of all books.
     */
    static async getNumberOfAll() {
        const [countResult] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("getBooksCount")
        );
        return countResult[0].count;
    }

    /**
     * Increments views count of book by id.
     * 
     * @param id Requested id.
     * @returns Promise to increment views count.
     */
    static async increaseViewsById(id: string) {
        return db.execute(
            await getQueryFrom("increaseViewsCount"),
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
            await getQueryFrom("increaseWantClicksCount"),
            [id]
        );
    }

    /**
     * Makes query to db to get image url of book by id.
     * 
     * @param id Requested id.
     * @returns Promise to get image url.
     */
    static async getImageNameById(id: string): Promise<string> {
        const [result] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("getImageUrlById"),
            [id]
        );
        const imageUrl = result[0]["image_url"];

        return imageUrl.split(".com/")[1];
    }
}

export default Book;