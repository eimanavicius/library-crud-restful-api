import {Request, Response, Router} from 'express';
import {ProblemDocument} from 'http-problem-details';
import {ERR_BOOK_NOT_FOUND} from "../library/books/find-book-by-id-use-case";
import {findBookByIdUseCase} from "../services";

export const BooksRouter: Router = Router()

    .get('/:id', async (req: Request, res: Response) => {
        try {
            const book = await findBookByIdUseCase.byId(req.params.id);
            res.status(200).json(book);
        } catch (err: any) {
            if (err?.message === ERR_BOOK_NOT_FOUND) {
                res.status(404).json(new ProblemDocument({status: 404, detail: 'Book not found.'}));
                return;
            }
            console.error(err);
            res.status(424).json(new ProblemDocument({status: 424, detail: 'Failed to fetch book.'}));
        }
    })
