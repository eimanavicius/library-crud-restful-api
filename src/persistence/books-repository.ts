import {PersistBookUseCase} from '../library/books/persist-book-use-case';
import {Book} from '../library/books/book';
import fs from 'fs';
import path from 'path';
import {ERR_BOOK_NOT_FOUND, FindBookByIdUseCase} from "../library/books/find-book-by-id-use-case";

export class BooksRepository implements PersistBookUseCase, FindBookByIdUseCase {
    constructor(private readonly directory: string) {
    }

    persist(book: Book): Promise<Book> {
        fs.writeFileSync(path.join(this.directory, `${book.id}.json`), JSON.stringify(book), {encoding: 'utf8'});
        return Promise.resolve(book);
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
