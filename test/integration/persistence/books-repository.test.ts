import fs from "fs";
import {BooksRepository} from "../../../src/persistence/books-repository";
import {ERR_BOOK_NOT_FOUND} from "../../../src/library/books/find-book-by-id-use-case";
import {Book} from "../../../src/library/books/book";

const { vol } = require('memfs');
jest.mock('fs');

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
const newBook: Book = {
    "id": nonExistingBookId,
    "isbn": "978-3-16-148410-0",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "genre": "Science Fiction",
    "createdAt": "2023-06-08T06:55:55.963Z"
};

describe('Books repository', () => {
    let service: BooksRepository;
    beforeEach(() => {
        vol.fromJSON({
            [`database/${existingBookId}.json`]: JSON.stringify(storedBook),
            'database/.index': { /* empty directory */}
        });

        service = new BooksRepository('database');
    });

    afterEach(() => {
        vol.reset();
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

    test('persist book', async () => {
        const storedBookPath = `database/${newBook.id}.json`;
        const indexedBookPath = "database/.index/" +
            "The%20Hitchhiker%27s%20Guide%20to%20the%20Galaxy-" + // title
            "2023-06-08T06%3A55%3A55%2E963Z-" + // createdAt
            "f0650381-d4be-4035-9b5d-343a0c2227dd.json"; // id

        const book = await service.persist(newBook);

        expect(book).toStrictEqual(newBook);
        expect(fs.existsSync(storedBookPath)).toBeTruthy();
        expect(fs.existsSync(indexedBookPath)).toBeTruthy();
        expect(JSON.parse(fs.readFileSync(storedBookPath).toString())).toStrictEqual(newBook);
    });

    test('persist call on existing book override contents', async () => {
        const storedBookPath = `database/${newBook.id}.json`;
        const newerVersionOfBook: Book = {...newBook, title: 'new title'};

        const originalBook = await service.persist(newBook);
        const newerBook = await service.persist(newerVersionOfBook);

        expect(newerBook).not.toStrictEqual(originalBook);
        expect(newerBook).toStrictEqual(newerVersionOfBook);
        expect(fs.existsSync(storedBookPath)).toBeTruthy();
        expect(JSON.parse(fs.readFileSync(storedBookPath).toString())).toStrictEqual(newerVersionOfBook);
    });
});
