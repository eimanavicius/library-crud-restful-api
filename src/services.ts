import {CreateAndPersistBookUseCase} from './library/books/create-and-persist-book-use-case';
import {BooksRepository} from './persistence/books-repository';
import {FindBookByIdUseCase} from "./library/books/find-book-by-id-use-case";
import {ValidateCreateBookDtoUseCase} from "./library/books/validate-create-book-dto-use-case";
import {FindPagedBooksUseCase} from "./library/books/find-paged-books-use-case";

const booksRepository = new BooksRepository(__dirname + '/../data');
export const createBookUseCase: CreateAndPersistBookUseCase = new CreateAndPersistBookUseCase(booksRepository);
export const findBookByIdUseCase: FindBookByIdUseCase = booksRepository;
export const validateCreateBookDtoUseCase: ValidateCreateBookDtoUseCase = new ValidateCreateBookDtoUseCase()
export const findPagedBooksUseCase: FindPagedBooksUseCase = booksRepository;
