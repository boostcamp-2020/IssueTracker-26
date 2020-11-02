/* eslint-disable */
require('dotenv').config();
const request = require('superTest');
const app = require('../app');
const issueModel = require('../models/issueModel');
const issueService = require('../services/issueService');

/* 이슈 목록 불러오기 API 테스트*/
describe('이슈 MODEL API TEST', ()=>{
  const issueId = [1,2];
  describe('이슈 MODEL', ()=>{

    test('이슈 목록이 있을 때 활성화된 이슈 목록 불러오기', async () => {
      const data = await issueModel.getIssueList();
      expect(data).toBeDefined();
    })
  })

  describe('이슈 LABEL MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 라벨 불러오기', async () => {
      const data = await issueModel.getIssueLabel(issueId[0]);
      expect(data.length>0).toBeTruthy();
    })
  })

  describe('이슈 ASSIGNEE MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 ASSIGNEE 불러오기', async () => {
      const data = await issueModel.getIssueList(issueId[0]);
      expect(data.length>0).toBeTruthy();
    })
  })

  describe('이슈 LABEL MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 라벨이 존재하지 않을 때 불러오기', async () => {
      const data = await issueModel.getIssueLabel(issueId[1]);
      console.log(data)
      expect(data.length==0).toBeTruthy();
    })
  })

  describe('이슈 ASSIGNEE MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 ASSIGNEE이 존재하지 않을 때 불러오기', async () => {
      const data = await issueModel.getIssueAssignee(issueId[1]);
      expect(data.length==0).toBeTruthy();
    })
  })
})

describe('이슈 SERVICE API TEST', ()=>{
  describe('이슈 SERVICE에서 리스트 불러오기', ()=>{

    test('이슈 목록이 있을 때 활성화된 이슈 목록 불러오기', async () => {
      const data = await issueService.getIssueList();
      expect(data).toBeDefined();
    })
  })
})

/* 이슈 목록 상세보기 API 테스트*/
/* 단위 테스트 */
describe('이슈 상세보기 MODEL API TEST', ()=>{
  const issueId = 1;
  describe('이슈 MODEL', ()=>{

    test('id값으로 이슈 상세보기 불러오기', async () => {
      const data = await issueModel.getIssueDetail(issueId);
      expect(data).toBeDefined();
    })
  })
})

describe('이슈 상세보기 SERVICE API TEST', ()=>{
  const issueId = 1;
  describe('이슈 SERVICE', ()=>{

    test('id값으로 이슈 상세보기 불러오기', async () => {
      const data = await issueService.getIssueDetail(issueId);
      expect(data).toBeDefined();
    })
  })
})

/* 슈퍼 테스트 */
describe('GET /issue는', () => {
  describe('성공시', () => {
    test('id가 1인 이슈 객체를 반환한다.', async (done) => {
      const response = await request(app)
      .get('/api/issue/detail/1').send();
      expect(response.body.ID).toEqual(1);
      done();
    })
  })

  describe('실패시', () => {
    test('id가 숫자가 아닐 경우 400으로 응답한다.', async (done) => {
      const response = await request(app)
      .get('/api/issue/detail/one').send();
      expect(response.status).toEqual(400);
      done();
    })

    test('id로 이슈를 찾을 수 없을 경우 404로 응답한다.', async (done) => {
      const response = await request(app)
      .get('/api/issue/detail/999').send();
      expect(response.status).toEqual(404);
      done();
    })
  })
})

/* 이슈 등록하기 API 테스트*/

/* 슈퍼 테스트 */
describe('POST /issue는', () => {
  describe('성공시', () => {
    test('생성된 이슈 객체를 반환환다..', async (done) => {
      const response = await request(app)
      .post('/api/issue/').send();
      expect(response.body.ID).toBeDefined();
      done();
    })
  })

  describe('실패시', () => {
    test('파라메터 누락시 400을 반환한다.', async (done) => {
      const response = await request(app)
      .post('/api/issue/').send();
      expect(response.status).toEqual(400);
      done();
    })
  })
})