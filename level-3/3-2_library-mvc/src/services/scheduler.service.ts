import cron, { ScheduledTask } from "node-cron";
import { logger } from "@utils/logger.util";
import Book from "@models/Book.model";
import { awsService } from "./aws.service";
import { backupService } from "./backup.service";

// Clean soft deleted entries and images every 6th hours.
const cleanDeletedEntriesTask = cron.schedule("0 */6 * * *", async () => {
    // 1. DELETE books and images
    const deletedBooks = await Book.clearDeletedBooks();
    if (deletedBooks > 0) {
        logger.info(`CORS: Deleted ${deletedBooks} books`);
    }
    
    // 2. DELETE authors
    const deletedAuthors = await Book.clearDeletedAuthors();
    if (deletedAuthors > 0) {
        logger.info(`CORS: Deleted ${deletedAuthors} authors`);
    }

    // 3. DELETE images
    const deletedImages = await awsService.clearDeletedImages();
    if (deletedImages > 0) {
        logger.info(`CORS: Deleted ${deletedImages} images`);
    }
}, {
    scheduled: false
});

const dbBackupTask = cron.schedule("0 0 * * *", async () => {
    const generatedName = await backupService.makeDatabaseBackup();
    logger.info(`Made backup with name: ${generatedName}`);
}, {
    scheduled: false
});

const initStart = (tasks: { task: ScheduledTask, name: string }[]) => {
    return () => {
        for (let i = 0; i < tasks.length; i++) {
            try {
                tasks[i].task.start();
                logger.info(`Task "${tasks[i].name}" started.`);
            } catch (error) {
                logger.error(error);
            }
        }
    }
}

export const scheduler = {
    start: initStart([
        { task: cleanDeletedEntriesTask, name: "Cleaning deleted entries" },
        { task: dbBackupTask, name: "Database backup" }
    ])
};
