import mock from 'mock-fs';
import {BooksRepository} from "../../../src/persistence/books-repository";
import {ERR_BOOK_NOT_FOUND} from "../../../src/library/books/find-book-by-id-use-case";

const existingBookId: string = 'b2f6f411-22cf-42f4-9634-43637cecf489';
const nonExistingBookId: string = 'f0650381-d4be-4035-9b5d-343a0c2227dd';
const storedBook: object = {
    "id": existingBookId,
    "isbn": "978-3-16-148410-0",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "genre": "Science Fiction",
    "createdAt": "2023-06-08T06:55:55.963Z"
};

mock({
    'database': {
        [`${existingBookId}.json`]: JSON.stringify(storedBook),
    }
});

describe('Books repository', () => {
    let service: BooksRepository;
    beforeEach(() => {
        service = new BooksRepository('database');
    });

    test('finds book', async () => {
        const book = await service.byId(existingBookId);
        expect(book).toStrictEqual(storedBook);
    });

    test('book do not exists', async () => {
        // not using jest `expect(async () => service.byId(nonExistingBookId)).toThrow(ERR_BOOK_NOT_FOUND);`
        // because it does not work with `mock-fs`
        try {
            await service.byId(nonExistingBookId)
            fail('should throw error');
        } catch (err: any) {
            expect(err.message).toBe(ERR_BOOK_NOT_FOUND);
        }
    });
});
