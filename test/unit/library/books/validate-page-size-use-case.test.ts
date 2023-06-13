import {DEFAULT_PAGE_SIZE, sizeValidator as schema} from "../../../../src/library/books/validate-page-size-use-case";
import joi from "joi";

describe('page size validation', () => {
    test.each([
        [2, 2],
        ["2", 2],
        ["2e1", 20],
        [undefined, DEFAULT_PAGE_SIZE],
    ])('%p valid page size %p', async (raw: any, value: number) => {
        let result = await schema.validateAsync(raw);
        expect(result).toStrictEqual(value)
    })

    test.each([
        [1],
        [100],
        ["2e2"],
        ["-2e2"],
        ["2e-2"],
        ["-2e-2"],
        ["gibberish"],
        ["5eur"],
        [null],
    ])('%p invalid page size', async (raw: any) => {
        try {
            await schema.validateAsync(raw);
            fail("valid value")
        } catch (e) {
            expect(e instanceof joi.ValidationError).toBeTruthy()
        }
    })

});
