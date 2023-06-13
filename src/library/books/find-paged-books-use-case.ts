import {Book} from "./book";

export interface FindPagedBooksUseCase {
    findAll(page: number, size: number): Promise<Book[]>;
}
