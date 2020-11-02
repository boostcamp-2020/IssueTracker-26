/* eslint-disable no-undef */
require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const userModel = require('../models/userModel');

describe('userName 중복 검사', () => {
  let server;
  beforeAll(async (done) => {
    server = await app.listen(3001, () => done());
  });
  afterAll(async () => {
    await server.close();
  });
  describe('model', () => {
    const TESTUSERNAME = 'park';
    const spyFn = jest.spyOn(userModel, 'checkDuplicated');
    beforeEach(() => {
      spyFn.mockClear();
    });
    test.skip('not undefined', async () => {
      const isDuplicated = await userModel.checkDuplicated();
      expect(isDuplicated).toBeDefined();
    });
    test.skip('practice spyMocking', async () => {
      await userModel.checkDuplicated(2, 3);
      expect(spyFn).toBeCalledTimes(1);
      expect(spyFn).toBeCalledWith(2, 3);
    });
    test.skip('get params', async () => {
      const result = await userModel.checkDuplicated('test');
      expect(result).toBe('test');
    });
    test.skip('make new function', async () => {
      // eslint-disable-next-line global-require
      const pool = require('../config/db-config');

      const checkFunction = async (userName) => {
        try {
          const [
            [result],
          ] = await pool.execute('select * from user where userName=?', [
            userName,
          ]);
          return result;
        } catch (err) {
          return undefined;
        }
      };
      const { userName } = await checkFunction(TESTUSERNAME);
      expect(userName).toBe(TESTUSERNAME);
    });
    describe('test function', () => {
      test('duplicated', async () => {
        const { userName } = await userModel.checkDuplicated(TESTUSERNAME);
        expect(userName).toBe(TESTUSERNAME);
      });
      test('unique', async () => {
        const uniqueId = 'qafsdaf36asf314';
        const result = await userModel.checkDuplicated(uniqueId);
        expect(result).toBeUndefined();
      });
    });
  });
  describe('request', () => {
    test('duplicated', async () => {
      const testData = { userName: 'park' };
      await request(app).post('/api/userName').send(testData).expect(409);
    });
    test('no duplicated', async (done) => {
      const testData = { userName: 'ejkwer124nwle23' };
      await request(app).post('/api/userName').send(testData).expect(202);
      done();
    });
  });
});
