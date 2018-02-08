const request = require('request');

jasmine.getEnv().defaultTimeoutInterval = 500;

describe('Installer API', () => {

    describe('GET /api/installer', () => {
        it('should respond with status 200', (done) => {
            request.get('http://localhost:8080/api/installer', (err, res, body) => {
                if (err) console.log(err);

                expect(res && res.statusCode).toBe(200);
                done();
            })
        });
    });

    describe('POST /api/installer', () => {
        it('should respond with status 500 when empty request body', (done) => {
            request.post('http://localhost:8080/api/installer', (err, res, body) => {
                if (err) console.log(err);

                expect(res && res.statusCode).toBe(500);
                done();
            })
        });
    });

    describe('GET /script/download', () => {
        it('should respond with status 500 when empty request query', (done) => {
            request.get('http://localhost:8080/api/script/download', (err, res, body) => {
                if (err) console.log(err);

                expect(res && res.statusCode).toBe(500);
                done();
            })
        });
    });

});
