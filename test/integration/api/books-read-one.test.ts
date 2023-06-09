import request from "supertest";
import server from "../../../src/http";
import {Book} from "../../../src/library/books/book";
import {ERR_BOOK_NOT_FOUND} from "../../../src/library/books/find-book-by-id-use-case";

jest.mock('../../../src/services');

describe('Books resource endpoint', () => {
    const findBookByIdUseCase = require('../../../src/services').findBookByIdUseCase;
    const notExistingBookId: string = '9a0c87d7-cd4a-4679-a7da-a86b2813470b';
    const existingBookId: string = '41dd16cd-760d-4cfb-9ba2-26fe437666dc';
    const book: Book = {
        'id': existingBookId,
        'isbn': '978-0-395-19395-2',
        'title': 'The Lord of the Rings',
        'author': 'J. R. R. Tolkien',
        'genre': 'Fantasy',
        'createdAt': '1954-07-29T00:00:00.000Z',
    };

    test('returns existing found book by id', () => {
        findBookByIdUseCase.byId.mockImplementationOnce(async () => book);
        return request(server)
            .get(`/books/${existingBookId}`)
            .expect(200)
            .then(response => {
                expect(response.body).toStrictEqual(book);
            });
    });

    test('returns Problem Details 404 when book notfound by id', () => {
        findBookByIdUseCase.byId.mockImplementationOnce(async () => {
            throw new Error(ERR_BOOK_NOT_FOUND)
        });
        return request(server)
            .get(`/books/${notExistingBookId}`)
            .expect(404)
            .then(response => {
                expect(response.body).toStrictEqual({
                    'detail': 'Book not found.',
                    'status': 404,
                    'title': 'Not Found',
                    'type': 'about:blank',
                });
            });
    });

    test('returns Problem Details 504 when something unexpected happens', () => {
        findBookByIdUseCase.byId.mockImplementationOnce(async () => {
            throw new Error('unexpected error test')
        });
        return request(server)
            .get(`/books/${existingBookId}`)
            .expect(424)
            .then(response => {
                expect(response.body).toStrictEqual({
                    'detail': 'Failed to fetch book.',
                    'status': 424,
                    'title': 'Failed Dependency',
                    'type': 'about:blank',
                });
            });
    });
});
