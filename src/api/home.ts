import express, {Request, Response, Router} from "express";
import {homepage} from '../../package.json';

export const HomeRouter: Router = express.Router()

    .get('/', (req: Request, res: Response): void => {
        res.redirect(homepage);
    })
