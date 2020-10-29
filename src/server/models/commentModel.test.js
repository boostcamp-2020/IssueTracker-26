/* eslint-disable no-undef */
const commentModel = require('./commentModel');

test('create Test', async () => {
  const testData = {
    content: 'test content22',
    userId: 1,
    issueId: 1,
  };
  const result = await commentModel.create(testData);
  expect(result).toEqual('this is for checking result');
});
