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
    test('request test', async () => {
      const testData = {
        content: 'supertest1',
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
        expect(result).toEqual(['@testMans', '@wenjkrwen']);
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
      test('createMention function - comment is not null', async () => {
        const testData = { userId: 1, issueId: 1, commentId: 1 };
        const mentionId = await commentService.createMention(testData);
        expect(mentionId).toBeDefined();
      });
    });
  });
});
