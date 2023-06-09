import {Book} from '../library/books/book';
import fs from 'fs';
import path from 'path';
import {ERR_BOOK_NOT_FOUND, FindBookByIdUseCase} from "../library/books/find-book-by-id-use-case";

export class BooksRepository implements FindBookByIdUseCase {
    constructor(private readonly directory: string) {
    }

    byId(id: string): Promise<Book> {
        const pathToBook = path.join(this.directory, `${id}.json`);
        if (!fs.existsSync(pathToBook)) {
            return Promise.reject(new Error(ERR_BOOK_NOT_FOUND));
        }
        const content = fs.readFileSync(pathToBook, {encoding: 'utf8'});
        return Promise.resolve(JSON.parse(content));
    }
}
