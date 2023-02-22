import db from "@services/db.service";
import { getQueryFrom } from "@services/sqlreader.service";
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