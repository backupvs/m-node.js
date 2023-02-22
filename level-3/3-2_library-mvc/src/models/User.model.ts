import db from "@services/mysql2.service";
import { getQueryFrom } from "@utils/sqlreader.util";
import { RowDataPacket } from "mysql2/promise";

export class User {
    constructor(public username: string, public password:string) {}

   static async getAdminByUsername(username: string) {
        const [admin] = await db.execute<RowDataPacket[]>(
            await getQueryFrom("get/getAdminByUsername"),
            { username }
        );

        return admin;
   }
}

export default User;