import mysqldump from "mysqldump";
import { awsService } from "./aws.service";

const options = {
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    },
    dumpToFile: "./temp_dump.sql"
};

const makeDatabaseBackup = async () => {
    await mysqldump(options);
    const { generatedName } = await awsService.uploadDatabaseDump();
    return generatedName;
}

export const backupService = { makeDatabaseBackup };

