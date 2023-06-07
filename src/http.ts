import express, { Express, NextFunction, Request, Response } from 'express';
import { homepage } from '../package.json';
import { ProblemDocument } from 'http-problem-details';

const http: Express = express();

http.get('/', (req: Request, res: Response): void => {
    res.redirect(homepage);
});

http.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    console.error(err);
    res.status(503).json(new ProblemDocument({status: 503}));
});

export default http;
