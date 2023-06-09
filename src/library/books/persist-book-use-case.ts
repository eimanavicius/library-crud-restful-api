import {Book} from './book';

export interface PersistBookUseCase {
    persist(book: Book): Promise<Book>;
}
