/* eslint-disable */
require('dotenv').config();
const issueModel = require('../models/issueModel');
const issueService = require('../services/issueService');
const issueContruller = require('../controllers/issueController');

/* 이슈 API 테스트*/
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
      expect(data).toBe(data.length>0);
    })
  })

  describe('이슈 ASSIGNEE MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 ASSIGNEE 불러오기', async () => {
      const data = await issueModel.getIssueList(issueId[0]);
      expect(data).toBe(data.length>0);
    })
  })

  describe('이슈 LABEL MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 라벨이 존재하지 않을 때 불러오기', async () => {
      const data = await issueModel.getIssueLabel(issueId[1]);
      expect(data).toBe(data.length==0);
    })
  })

  describe('이슈 ASSIGNEE MODEL', ()=>{

    test('이슈 목록이 있을 때 해당 이슈의 ASSIGNEE이 존재하지 않을 때 불러오기', async () => {
      const data = await issueModel.getIssueList(issueId[1]);
      expect(data).toBe(data.length==0);
    })
  })
})

describe('이슈 SERVICE API TEST', ()=>{
  const issueId = [1,2];
  describe('이슈 SERVICE에서 리스트 불러오기', ()=>{

    test('이슈 목록이 있을 때 활성화된 이슈 목록 불러오기', async () => {
      const data = await issueService.getIssueList();
      expect(data).toBeDefined();
    })
  })
})

describe('이슈 CONTROLLER API TEST', ()=>{
  const issueId = [1,2];
  describe('이슈 CONTROLLER에서 리스트 불러오기', ()=>{

    test('이슈 목록이 있을 때 활성화된 이슈 목록 불러오기', async () => {
      const data = await issueContruller.getIssueList();
      expect(data).toBeDefined();
    })
  })
})


