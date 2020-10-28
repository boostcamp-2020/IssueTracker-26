/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

describe('comment controller', () => {
  test('request', async () => {
    const testData = {
      content: 'supertest1',
      userId: 1,
      issueId: 1,
    };
    const res = await request(app).post('/api/comment').send(testData);
    expect(res.status).toBe(201);
  });
});
