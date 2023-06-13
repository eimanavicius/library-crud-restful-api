import {PersistBookUseCase} from '../library/books/persist-book-use-case';
import {Book} from '../library/books/book';
import fs, {mkdirSync} from 'fs';
import path from 'path';
import {ERR_BOOK_NOT_FOUND, FindBookByIdUseCase} from "../library/books/find-book-by-id-use-case";

export class BooksRepository implements PersistBookUseCase, FindBookByIdUseCase {
    private readonly indexDirectory: string;
    constructor(private readonly directory: string) {
        this.indexDirectory = path.join(directory, '.index');
        mkdirSync(this.indexDirectory, {recursive: true});
    }

    findAll(page: number, size: number): Promise<Book[]> {
        const files = fs.readdirSync(this.indexDirectory).sort().slice(page * size, (page + 1) * size);
        const books: Book[] = [];
        for (const file of files) {
            const content = fs.readFileSync(path.join(this.indexDirectory, file), {encoding: 'utf8'});
            books.push(JSON.parse(content));
        }
        return Promise.resolve(books);
    }

    persist(book: Book): Promise<Book> {
        const original = path.join(this.directory, `${book.id}.json`);
        const indexed = path.join(
            this.indexDirectory,
            BooksRepository.encodePathComponent(`${book.title}-${book.createdAt}-${book.id}`) + '.json'
        );
        if (fs.existsSync(indexed)) {
            fs.unlinkSync(indexed);
        }
        fs.writeFileSync(original, JSON.stringify(book), {encoding: 'utf8'});
        fs.symlinkSync(original, indexed);
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

    static encodePathComponent(component: string): string {
        return encodeURIComponent(component)
            .replaceAll('.', '%2E')
            .replaceAll("'", '%27')
            .replaceAll('"', '%22');
    }
}
