require('dotenv').config();
/* eslint-disable */
const userService = require('../services/userService');

describe('userService 테스트', () => {
  describe('findUser', () => {
    test('username과 일치되는 유저가 있는 경우 user를 반환', async () => {
      const input = 'test';
      const user = await userService.findUser(input);
      expect(input).toEqual(user.userName);
    });
    test('username에 일치하는 유저가 없는 경우 undefined를 반환', async () => {
      const input = 'test2';
      const user = await userService.findUser(input);
      expect(user).toBeUndefined();
    });
  });
});
