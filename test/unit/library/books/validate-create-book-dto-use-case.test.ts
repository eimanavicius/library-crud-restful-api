import {CreateBookDto} from "../../../../src/library/books/book";

import {ValidateCreateBookDtoUseCase} from "../../../../src/library/books/validate-create-book-dto-use-case";

describe('validate-create-book-dto-use-case', () => {
    const validBook: CreateBookDto = {
        'isbn': '978-0-395-19395-2',
        'title': 'The Lord of the Rings',
        'author': 'J. R. R. Tolkien',
        'genre': 'Fantasy',
    };
    const validator = new ValidateCreateBookDtoUseCase().validateCreateBookDto;

    test('validate valid object', async () => {
        expect(await validator(validBook)).toStrictEqual(validBook);
    });

    test('validate invalid isbn', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            isbn: 'invalid-isbn',
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"isbn" with value "invalid-isbn" fails to match the valid ISBN 13 pattern');
        }
    });

    test('validate title', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            title: '',
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"title" is not allowed to be empty');
        }
    });

    test('validate author', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            author: '',
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"author" is not allowed to be empty');
        }
    });

    test('validate genre', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            genre: '',
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"genre" is not allowed to be empty');
        }
    });

    test('validate genre null', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            genre: null!,
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"genre" must be a string');
        }
    });

    test('validate genre undefined', async () => {
        const bookWithInvalidIsbn: CreateBookDto = {
            ...validBook,
            genre: undefined!,
        }

        try {
            await validator(bookWithInvalidIsbn);
            fail('should throw validation error');
        } catch (err: any) {
            expect(err.message).toBe('"genre" is required');
        }
    });
});
