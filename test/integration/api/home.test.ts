import request from "supertest";
import server from "../../../src/http";
import {homepage} from '../../../package.json';

describe('Express setup', () => {
    it('redirect root path to homepage', () => {
        expect(homepage).not.toBeNull();
        return request(server)
            .get('/')
            .expect('Location', homepage)
            .expect(302);
    });
});
