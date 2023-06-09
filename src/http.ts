import express, { Express, NextFunction, Request, Response } from 'express';
import { homepage } from '../package.json';
import { ProblemDocument } from 'http-problem-details';
import { BooksRouter } from './api/books';

const http: Express = express();

http.use(express.json());

http.get('/', (req: Request, res: Response): void => {
    res.redirect(homepage);
});

http.use('/books', BooksRouter);

export const UNHANDLED_ERROR_ROUTE: string = '/test-allways-unhandled-error';
if (process.env.NODE_ENV === 'test') {
    http.get(UNHANDLED_ERROR_ROUTE, () => {
        throw new Error('Test unhandled error');
    });
}

http.all('*', (req: Request, res: Response): void => {
    res.status(404).json(new ProblemDocument({status: 404}));
});

http.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    console.error(err);
    res.status(503).json(new ProblemDocument({status: 503}));
});

export default http;
