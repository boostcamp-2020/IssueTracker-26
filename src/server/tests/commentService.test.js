/* eslint-disable no-undef */
require('dotenv').config();
const commentService = require('../services/commentService');

test.only('create comment service', async () => {
  const testData = {
    content: 'test service2',
    userId: 1,
    issueId: 1,
  };
  const result = await commentService.create(testData);
  expect(result).toBeDefined();
});

test('contain mention', async () => {
  const testData =
    'this is comments. comehere, @testMans sdfnjlksdfn @wenjkrwen, @asd';
  const result = commentService.containMention(testData);
  expect(result).toEqual(['@testMans', '@wenjkrwen']);
});
