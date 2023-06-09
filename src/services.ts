import {BooksRepository} from './persistence/books-repository';
import {FindBookByIdUseCase} from "./library/books/find-book-by-id-use-case";

const booksRepository = new BooksRepository(__dirname + '/../data');
export const findBookByIdUseCase: FindBookByIdUseCase = booksRepository;
