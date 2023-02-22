import Joi from "joi";

const validator = (schema: Joi.ObjectSchema) => {
    return (payload: any) => {
        return schema.validate(payload, { abortEarly: false });
    }
}

const bookSchema = Joi.object({
    bookTitle: Joi.string().required(),
    about: Joi.string().required(),
    bookYear: Joi.number().max(9999).required(),
    pages: Joi.number().max(9999).required(),
    authors: Joi.array().items(Joi.string().required()).required()
});

export const validateBook = validator(bookSchema);