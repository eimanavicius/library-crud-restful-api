import Joi from "joi";

export const DEFAULT_PAGE_SIZE: number = 5;
export const MIN_PAGE_SIZE: number = 2;
export const MAX_PAGE_SIZE: number = 20;
export const sizeValidator = Joi.number().greater(MIN_PAGE_SIZE - 1).less(MAX_PAGE_SIZE + 1).default(DEFAULT_PAGE_SIZE);
export const pageValidator = Joi.number().greater(-1).default(0);
