import { ValidationErrorItem } from "joi";

class RequestError extends Error {
    status: number;
    details: ValidationErrorItem[] | undefined;

    constructor(status: number, message: string, details?: ValidationErrorItem[]) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

export default RequestError;