import request from "supertest";
import {Book, CreateBookDto} from "../../../src/library/books/book";
import server from "../../../src/http";

jest.mock('../../../src/services');

describe('Books resource endpoint', () => {
    const createBookUseCase = require('../../../src/services').createBookUseCase;
    const newBookId: string = '9a0c87d7-cd4a-4679-a7da-a86b2813470b';
    const newBook: Book = {
        'id': newBookId,
        'isbn': '978-0-395-19395-2',
        'title': 'The Lord of the Rings',
        'author': 'J. R. R. Tolkien',
        'genre': 'Fantasy',
        'createdAt': '1954-07-29T00:00:00.000Z',
    };
    const newBookRequest: CreateBookDto = {
        'isbn': '978-0-395-19395-2',
        'title': 'The Lord of the Rings',
        'author': 'J. R. R. Tolkien',
        'genre': 'Fantasy',
    };

    test('creates and returns location to book', () => {
        createBookUseCase.create.mockImplementationOnce(async () => newBook);
        return request(server)
            .post('/books')
            .send(newBookRequest)
            .expect(201)
            .expect('Location', `/books/${newBookId}`)
            .expect('content-length', '0')
            .then(() => {
                expect(createBookUseCase.create).toBeCalledWith(newBookRequest)
                expect(createBookUseCase.create).toBeCalledTimes(1)
            })
    });

    test('returns Problem Details 504 when something unexpected happens', () => {
        createBookUseCase.create.mockImplementationOnce(async () => {
            throw new Error('unexpected error test')
        });
        return request(server)
            .post(`/books`)
            .send(newBookRequest)
            .expect(424)
            .then(response => {
                expect(response.body).toStrictEqual({
                    'detail': 'Failed to persist book.',
                    'status': 424,
                    'title': 'Failed Dependency',
                    'type': 'about:blank',
                });
            });
    });
});
