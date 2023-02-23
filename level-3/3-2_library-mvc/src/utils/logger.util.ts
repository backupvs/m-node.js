export const info = (message: string) => {
    const timestamp = new Date().toLocaleString();
    setImmediate(() => {
        console.log(`[INFO] ${timestamp} ${message}`);
    });
};

export const error = (error: any) => {
    const timestamp = new Date().toLocaleString();
    setImmediate(() => {
        console.log(`[ERROR] ${timestamp} ${error || "Unknown"}`);
    });
};

export const logger = { info, error };