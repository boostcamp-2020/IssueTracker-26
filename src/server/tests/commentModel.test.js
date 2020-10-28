/* eslint-disable no-undef */
require('dotenv').config();
const commentModel = require('../models/commentModel');

test('create Test', async () => {
  const testData = {
    content: 'test content22',
    userId: 1,
    issueId: 1,
  };
  const result = await commentModel.create(testData);
  expect(result).toBeDefined();
});
