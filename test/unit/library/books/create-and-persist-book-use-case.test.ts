import {CreateAndPersistBookUseCase} from "../../../../src/library/books/create-and-persist-book-use-case";
import {PersistBookUseCase} from "../../../../src/library/books/persist-book-use-case";
import {CreateBookDto} from "../../../../src/library/books/book";

// 9a0c87d7-cd4a-4679-a7da-a86b2813470b
const uuid4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
// 1954-07-29T00:00:00.000Z
const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/i;

describe('create-and-persist-book-use-case', () => {
    let useCase: CreateAndPersistBookUseCase;
    let storage: PersistBookUseCase = {
        persist: jest.fn(args => Promise.resolve(args))
    }
    const request: CreateBookDto = {
        isbn: '123',
        title: 'title',
        author: 'author',
        genre: 'genre',
    };

    beforeEach(() => {
        useCase = new CreateAndPersistBookUseCase(storage);
    });

    test('assigns id to book', async () => {
        const book = await useCase.create(request);

        expect(book).toHaveProperty('id');
        expect(book.id).toMatch(uuid4Regex);
    });

    test('assigns createdAt date in ISO8601 format to book', async () => {
        const book = await useCase.create(request);

        expect(book).toHaveProperty('createdAt');
        expect(book.createdAt).toMatch(iso8601Regex);
    });

    test('persists book', async () => {
        await useCase.create(request);

        expect(storage.persist).toBeCalledTimes(1);
    });
});
