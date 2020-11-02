require('dotenv').config();
/* eslint-disable */
const userService = require('../services/userService');
const userController = require('../controllers/userController');
const { makeHashPassword, comparePassword } = require('../util');

describe('비밀번호 암호화 테스트(makeHashPassword, comparePassword)', () => {
  const password = '12345';
  const hashedPassword = makeHashPassword(password);
  test('비밀번호와 암호화된 비밀번호를 비교했을 때, true여야 한다.', () => {
    const isSamePassword = comparePassword(password, hashedPassword);
    expect(isSamePassword).toBe(true);
  });
  test('암호회된 비밀번호가 다른 비밀번호랑 비교했을때, false여야 한다.', () => {
    const otherPassword = '54321';
    const isSamePassword = comparePassword(otherPassword, hashedPassword);
    expect(isSamePassword).toBe(false);
  });
});

describe('userService 테스트', () => {
  describe('checkDuplicated', () => {
    test('username과 일치되는 유저가 있는 경우 user를 반환', async () => {
      const input = 'park';
      const user = await userService.checkDuplicated(input);
      expect(input).toEqual(user.userName);
    });
    test('username에 일치하는 유저가 없는 경우 undefined를 반환', async () => {
      const input = 'test2';
      const user = await userService.checkDuplicated(input);
      expect(user).toBeUndefined();
    });
  });
});
