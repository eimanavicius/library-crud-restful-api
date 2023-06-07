import express, { Express, Request, Response } from 'express';
import { homepage } from '../package.json';

const http: Express = express();

http.get('/', (req: Request, res: Response): void => {
    res.redirect(homepage);
});

export default http;
