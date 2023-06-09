import server, {UNHANDLED_ERROR_ROUTE} from "../../../src/http";
import {homepage} from '../../../package.json';
import request from "supertest";

describe('Express setup', () => {
    it('redirect root path to homepage', () => {
        expect(homepage).not.toBeNull();
        return request(server)
            .get('/')
            .expect('Location', homepage)
            .expect(302);
    });

    it('unhandled error responds with Problem Detail json', () => {
        return request(server)
            .get(UNHANDLED_ERROR_ROUTE)
            .expect('Content-Type', /^application\/json/)
            .expect(503)
            .then(response => {
                expect(response.body).toStrictEqual({
                    type: 'about:blank',
                    title: 'Service Unavailable',
                    status: 503
                });
            });
    });

    it('not found routes return Problem Details response', () => {
        return request(server)
            .get('/test-i-do-not-exist')
            .expect('content-type', /^application\/json/)
            .expect(404)
            .then(response => {
                expect(response.body).toMatchObject({
                    'type': 'about:blank',
                    'title': 'Not Found',
                    'status': 404
                });
            });
    });
});
