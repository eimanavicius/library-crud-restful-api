import {CreateAndPersistBookUseCase} from "../../../../src/library/books/create-and-persist-book-use-case";
import {PersistBookUseCase} from "../../../../src/library/books/persist-book-use-case";
import {CreateBookDto} from "../../../../src/library/books/book";
import {Clock} from "../../../../src/library/clock";

// 9a0c87d7-cd4a-4679-a7da-a86b2813470b
const uuid4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

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
        useCase.clock = Clock.fixed(new Date('1954-07-29T00:00:00.000Z'));
        const book = await useCase.create(request);

        expect(book).toHaveProperty('createdAt');
        expect(book.createdAt).toBe("1954-07-29T00:00:00.000Z");
    });

    test('persists book', async () => {
        await useCase.create(request);

        expect(storage.persist).toBeCalledTimes(1);
    });
});
