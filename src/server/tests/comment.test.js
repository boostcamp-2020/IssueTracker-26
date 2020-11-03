/* eslint-disable no-undef */
require('dotenv').config();
const request = require('supertest');
const commentModel = require('../models/commentModel');
const commentService = require('../services/commentService');
const app = require('../app');
const mentionModel = require('../models/mentionModel');

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
  describe('UPDATE', () => {
    describe('MODEL', () => {
      describe('no mention', () => {
        test('put : commnetId 있음', async (done) => {
          const result = await commentModel.update(1, 'update using jest');
          expect(result).toBe(true);
          done();
        });
        test('put : commnetId 없음', async (done) => {
          const result = await commentModel.update(0, 'update using jest');
          expect(result).toBeUndefined();
          done();
        });
      });
      describe('mention', () => {
        test('commentId 포함 생성', async (done) => {
          const testData = {
            userId: 1,
            issueId: 1,
            commentId: 261,
          };
          const result = await mentionModel.create(testData);
          expect(result).toBeDefined();
          done();
        });
        test('commnetId null', () => {
          expect(1).toBe(2); // todo: 구현
        });
      });
    });
    describe('SERVICE', () => {
      describe('remove mention', () => {
        describe('issue 로만 삭제', () => {
          test('issueId 없음', async (done) => {
            const issueId = 95959;
            const result = await commentService.removeMention({ issueId });
            expect(result).toBeUndefined();
            done();
          });
          test.skip('isuueId 있음', async (done) => {
            const issueId = 1; // mention에 해당 issueId가 있어야함
            const result = await commentService.removeMention({ issueId });
            expect(result).toBe(true);
            done();
          });
        });
        describe('issue + comment 로 삭제', () => {
          test.skip('삭제 성공', async (done) => {
            const testData = {
              issueId: 1,
              commentId: 3,
            };
            const result = await commentService.removeMention(testData);
            expect(result).toBe(true);
            done();
          });
          test('삭제 실패', async (done) => {
            const testData = {
              issueId: 2,
              commentId: 3,
            };
            const result = await commentService.removeMention(testData);
            expect(result).toBeUndefined();
            done();
          });
        });
      });
      describe('udate mention', () => {
        test.skip('코멘트 업데이트 with mention', async (done) => {
          const testData = {
            commentId: 270, // 주의
            content: 'hey @park and @choi and @kim',
            issueId: 1,
          };
          const result = await commentService.update(testData);
          expect(result).toBe(true); // mention에 대한 테스트 결과는 모름
          done();
        });
      });
    });
    describe('REQUEST', () => {
      test.skip('코멘트에 멘션 있게 변경', async (done) => {
        const testData = {
          commentId: 270, // 주의
          content: 'hey @park and @choi and @kim',
          issueId: 1,
        };
        await request(app).put('/api/comment/261').send(testData).expect(205);
        done();
      });
    });
  });
});
