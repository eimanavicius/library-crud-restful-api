import {CreateBookDto} from "./book";
import joi, {ValidationErrorItem} from "joi";

const isbn13Pattern = /^(?:ISBN(?:-13)?:? )?(?=\d{13}$|(?=(?:\d+-){4})[-\d]{17}$)97[89]-?\d{1,5}-?\d+-?\d+-?\d$/;
const CreateBookDtoSchema: joi.Schema<CreateBookDto> = joi.object().keys({
    isbn: joi.string().pattern(isbn13Pattern, {name: "valid ISBN 13"}).required(),
    title: joi.string().required(),
    author: joi.string().required(),
    genre: joi.string().required(),
});

export class ValidateCreateBookDtoUseCase {
    async validateCreateBookDto(dto: CreateBookDto): Promise<CreateBookDto> {
        const results = CreateBookDtoSchema.validate(dto, {abortEarly: false});
        if (results.error) {
            const message = results.error.details.map((it: ValidationErrorItem) => it.message).join(', ');
            throw new ValidationError(message);
        }
        return results.value;
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
