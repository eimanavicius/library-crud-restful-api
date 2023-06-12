import { PersistBookUseCase } from './persist-book-use-case';
import { Book, CreateBookDto } from './book';
import { v4 as uuid } from 'uuid';
import { Clock } from "../clock";

export class CreateAndPersistBookUseCase {
    clock: Clock = Clock.system();

    constructor(private readonly storage: PersistBookUseCase) {
    }

    async create(request: CreateBookDto): Promise<Book> {
        return this.storage.persist({
            id: uuid(),
            isbn: request.isbn!,
            title: request.title!,
            author: request.author!,
            genre: request.genre!,
            createdAt: this.clock.now().toISOString(),
        });
    }
}
