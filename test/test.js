const request = require('supertest');
const app = require('../app');

describe('emailer integration tests', () => {
  const testMessage = {
    text: 'test',
    subject: 'test',
  };
  const testRecipient = 'emailerapp.ckm@gmail.com';

  describe('POST /', () => {
    it('should send an email', done => {
      request(app)
        .post('/')
        .send({
          message: testMessage,
          recipient: testRecipient,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(res => {
          res.body.id = 'test';
        })
        .expect(200, {
          accepted: ['emailerapp.ckm@gmail.com'],
          id: 'test',
          message: {
            subject: 'test',
            text: 'test',
          },
          rejected: [],
        })
        .end(err => {
          if (err) return done(err);
          done();
        });
    });
  });
});
