/* eslint-disable no-undef */
const commentService = require('./commentService');

test.skip('create comment service', async () => {
  const testData = {
    content: 'test service2',
    userId: 1,
    issueId: 1,
  };
  const result = await commentService.create(testData);
  expect(result).toBe(7);
});

test('contain mention', async () => {
  const testData =
    'this is comments. comehere, @testMans sdfnjlksdfn @wenjkrwen, @asd';
  const result = commentService.containMention(testData);
  expect(result).toEqual(['@testMans', '@wenjkrwen']);
});
