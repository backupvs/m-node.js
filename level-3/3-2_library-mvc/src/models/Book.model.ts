import db from "@services/mysql2.service";
import { getQueryFrom } from "@utils/sqlreader.util";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

/**
 * Represents a book entry in database.
 */
export class Book {
    public id?: string;

    constructor(
        public title: string,
        public about: string,
        public image_url: string,
        public release_year: number,
        public pages: number,
    ) { }

    /**
     * Makes query to db to create book.
     * 
     * @returns Promise to create book.
     */
    async save(): Promise<number> {
        const [result] = await db.execute<ResultSetHeader>(
            await getQueryFrom("add/addBook"),
            [
                this.title,
                this.about,
                this.image_url,
                this.release_year.toString(),
                this.pages.toString()
            ]
        );
        this.id = result.insertId.toString();

        return result.insertId;
    }

    /**
     * Makes query to add assosiation to book id with author id.
     * 
     * @param authorId Requested author id.
     * @returns Promise to add assosiation to db.
     */
    async addAssociation(authorId: string) {
        return db.execute(
            await getQueryFrom("add/addAssociation"),
            { authorId, bookId: this.id }
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
            await getQueryFrom("get/getBookById"),
            [id]
        );

        return book;
    }

    /**
     * Makes query to db to delete book by id
     * and author if it is no longer assosiated with any book.
     * 
     * @param id Requested id.
     * @returns Promise to delete book and author.
     */
    static async deleteById(id: string): Promise<void> {
        db.execute<RowDataPacket[]>(
            await getQueryFrom("delete/deleteBookById"),
            [id]
        ).then(async () => db.execute<RowDataPacket[]>(
            await getQueryFrom("delete/deleteUnrelatedAuthor"),
            [id]
        ));
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
            await getQueryFrom("get/findBook"),
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
            await getQueryFrom("get/getAllBooks"),
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
            await getQueryFrom("get/getBooksCount")
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
            await getQueryFrom("analytics/increaseViewsCount"),
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
            await getQueryFrom("analytics/increaseWantClicksCount"),
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
            await getQueryFrom("get/getImageUrlById"),
            [id]
        );
        const imageUrl = result[0]["image_url"];

        return imageUrl.split(".com/")[1];
    }

    /**
     * Makes query to db to add author
     * and returns inserted or existing id.
     * 
     * @param fullName Full name of author.
     * @returns Promise to get id of inserted or existing author.
     */
    static async addAuthor(fullName: string): Promise<number> {
        let result = await db.execute<ResultSetHeader>(
            await getQueryFrom("add/addAuthors"),
            { fullName }
        );

        if (result.length > 0) {
            let [resultId] = await db.execute<RowDataPacket[]>(
                await getQueryFrom("get/getAuthorIdByFullName"),
                { fullName }
            );

            return resultId[0].id;
        } else {

            return result[0].insertId;
        }
    }
}

export default Book;