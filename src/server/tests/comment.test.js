/* eslint-disable no-undef */
require('dotenv').config();
const request = require('supertest');
const commentModel = require('../models/commentModel');
const commentService = require('../services/commentService');
const app = require('../app');

describe('comment API', () => {
  describe('CREATE', () => {
    test('model test', async () => {
      const testData = {
        content: 'test content22',
        userId: 1,
        issueId: 1,
      };
      const result = await commentModel.create(testData);
      expect(result).toBeDefined();
    });
    test('request test - no mention', async () => {
      const testData = {
        content: 'supertest1',
        userId: 1,
        issueId: 1,
      };
      const res = await request(app).post('/api/comment').send(testData);
      expect(res.status).toBe(201);
    });
    test('request test - mention', async () => {
      const testData = {
        content: 'hey, @park show this',
        userId: 1,
        issueId: 1,
      };
      const res = await request(app).post('/api/comment').send(testData);
      expect(res.status).toBe(201);
    });
    test('service test', async () => {
      const testData = {
        content: 'test service2',
        userId: 1,
        issueId: 1,
      };
      const result = await commentService.create(testData);
      expect(result).toBeDefined();
    });
    describe('mention test', () => {
      test('contain mention function test (exist)', async () => {
        const testData =
          'this is comments. comehere, @testMans sdfnjlksdfn @wenjkrwen, @asd';
        const result = commentService.containMention(testData);
        expect(result).toEqual(['@testMans', '@wenjkrwen', '@asd']);
      });
      test('contain mention function test (not exist)', async () => {
        const testData = 'this is comments. comehere, sdfnjlksdfn';
        const result = commentService.containMention(testData);
        expect(result).toEqual(null);
      });
      test('cehck user who mentioned - zero', async () => {
        const testData = ['@nobody'];
        const result = await commentService.checkUser(testData);
        expect(result).toEqual([]);
      });
      test('check user who mentioned - only one', async () => {
        const testData = ['@park'];
        const result = await commentService.checkUser(testData);
        expect(result).toEqual([1]);
      });
      test('check user who mentioned - two people', async () => {
        const testData = ['@park', '@choi'];
        const result = await commentService.checkUser(testData);
        expect(result).toEqual([1, 2]);
      });
      test('createMention function - comment is null', async () => {
        const testData = { userId: 1, issueId: 1 };
        const mentionId = await commentService.createMention(testData);
        expect(mentionId).toBeDefined();
      });
      test('createMention function - comment is not null', async (done) => {
        const testData = { userId: 1, issueId: 1, commentId: 1 };
        const mentionId = await commentService.createMention(testData);
        expect(mentionId).toBeDefined();
        done();
      });
    });
  });

  describe('READ', () => {
    describe('MODEL', () => {
      test('select comment from issue(exist)', async () => {
        const issueId = 1;
        const comments = await commentModel.read(issueId);
        expect(comments).toBeDefined();
      });
      test('select comment from issue(not exist)', async () => {
        const issueId = 110;
        const comments = await commentModel.read(issueId);
        expect(comments).toEqual([]);
      });
    });
    describe('REQUEST', () => {
      test('request1', async (done) => {
        const testData = {
          issueId: 1,
        };
        const res = await request(app).get('/api/comment').send(testData);
        expect(res.status).toBe(200);
        done();
      });
    });
  });
  describe('DELETE', () => {
    describe('MODEL', () => {
      test('잘못된 comment id : undefined 반환', async () => {
        const wrongId = 2121;
        const result = await commentModel.remove(wrongId);
        expect(result).toBeUndefined();
      });
      test.skip('해당 comment id 삭제 : true 반환', async () => {
        const commentId = 250; // 삭제할 comment ID 입력
        const result = await commentModel.remove(commentId);
        expect(result).toBeDefined();
      });
    });
    describe('REQUEST', () => {
      test.skip('삭제를 위한 올바른 commentId', async (done) => {
        const commentId = 254; // 삭제할 comment ID 입력
        await request(app).delete(`/api/comment/${commentId}`).expect(205);
        done();
      });
      test('잘못된 id로 요청', async (done) => {
        await request(app).delete('/api/comment/2462627').expect(406);
        done();
      });
      test('문자로 id 요청', async (done) => {
        await request(app).delete('/api/comment/as').expect(400);
        done();
      });
    });
  });
});
