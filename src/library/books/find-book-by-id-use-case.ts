import {Book} from "./book";

export const ERR_BOOK_NOT_FOUND = 'book-not-found';

export interface FindBookByIdUseCase {
    byId(id: string): Promise<Book>;
}
