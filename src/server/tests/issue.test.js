/* eslint-disable */
require('dotenv').config();
const request = require('superTest');
const app = require('../app');
const { milestoneUpdate } = require('../models/issueModel');
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
/* 단위 테스트 */
describe('이슈 등록하기 API 단위 TEST', () => {
  let issueInfo = {
    "title" : "테스트 이슈",
    "content" : "",
    "userId" : "1",
    "milestoneId" : "1",
    "assignees" : ["2"],
    "labels" : ["1"]
  };

  describe('이슈 등록하기 MODEL API TEST', () => {
    describe('이슈 MODEL', ()=>{
  
      test('등록한 이슈 데이터로 이슈 등록하기', async () => {
        const data = await issueModel.createIssue(issueInfo);
        expect(data).toBeDefined();
      })
    })
  })
  
  describe('이슈 등록하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('등록한 이슈 데이터로 이슈 등록하기', async () => {
        const data = await issueService.createIssue(issueInfo);
        expect(data).toBeDefined();
      })
    })
  })
})

/* 슈퍼 테스트 */
describe('POST /issue는', () => {
  let issueInfo = {
    "title" : "테스트 이슈",
    "content" : "",
    "userId" : "1",
    "milestoneId" : "1",
    "assignees" : ["2"],
    "labels" : ["1"]
  };

  describe('성공시', () => {
    test('생성된 이슈 객체를 반환환다..', async (done) => {
      const response = await request(app)
      .post('/api/issue/').send(issueInfo);
      expect(response.body).toBeDefined();
      done();
    })
  })

  issueInfo.title = '';
  describe('실패시', () => {
    test('title 파라메터 누락시 400을 반환한다.', async (done) => {
      const response = await request(app)
      .post('/api/issue/').send();
      expect(response.status).toEqual(400);
      done();
    })
  })

  issueInfo.title = 'test';
  issueInfo.usrId = '';
  describe('실패시', () => {
    test('usrId 파라메터 누락시 400을 반환한다.', async (done) => {
      const response = await request(app)
      .post('/api/issue/').send();
      expect(response.status).toEqual(400);
      done();
    })
  })
})

/* 이슈 활성화 API 테스트*/
/* 단위 테스트 */
describe('이슈 활성화 API 단위 TEST', () => {
  const userId = 1;
  const onState = 1;
  const closeState = 0;
  describe('이슈 활성화 MODEL API TEST', () => {
    describe('이슈 MODEL', ()=>{
  
      test('사용자가 이슈 닫기', async () => {
        const data = await issueModel.stateChange(onState, userId);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 MODEL', ()=>{
  
      test('사용자가 이슈 활성화하기', async () => {
        const data = await issueModel.stateChange(closeState, userId);
        expect(data).toBeDefined();
      })
    })
  })
  
  describe('이슈 활성화 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('사용자가 이슈 닫기', async () => {
        const data = await issueService.stateChange(onState, userId);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 SERVICE', ()=>{
  
      test('사용자가 이슈 활성화하기', async () => {
        const data = await issueService.stateChange(closeState, userId);
        expect(data).toBeDefined();
      })
    })
  })
});

/* 슈퍼 테스트 */
describe('POST /issue는', () => {
  const state = {state: 1, id: 1};
  describe('성공시', () => {

    test('이슈를 성공적으로 닫으면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api/issue/state').send(state);
      expect(response.status).toEqual(200);
      done();
    })
  })
  
  state.state = 0;
  describe('성공시', () => {

    test('이슈를 성공적으로 활성화 하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api/issue/state').send(state);
      expect(response.status).toEqual(200);
      done();
    })
  })
})

/* 이슈 수정하기 API 테스트*/
/* 단위 테스트 */
describe('이슈 제목 수정하기 API 단위 TEST', () => {
  const id = 1;
  const title = 'test 제목';
  const content = 'test 내용';
  const assignees = [2];
  const labels = [2];
  const milestoneId = 2;
  describe('이슈 제목 수정하기 MODEL API TEST', () => {
    describe('이슈 MODEL', ()=>{
  
      test('이슈 제목 수정하기', async () => {
        const data = await issueModel.titleUpdate(id, title);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 MODEL', ()=>{
  
      test('이슈 내용 수정하기', async () => {
        const data = await issueModel.contentUpdate(id, content);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 MODEL', ()=>{
  
      test('이슈 담당자 수정하기', async () => {
        await issueModel.assigneesDelete(id);
        const data = await issueModel.assigneesUpdate(id, assignees[0]);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 MODEL', ()=>{
  
      test('이슈 레이블 수정하기', async () => {
        await issueModel.labelsDelete(id);
        const data = await issueModel.labelUpdate(id, labels[0]);
        expect(data).toBeDefined();
      })
    })

    describe('이슈 MODEL', ()=>{
  
      test('이슈 마일스톤 수정하기', async () => {
        const data = await issueModel.milestoneUpdate(id, milestoneId);
        expect(data).toBeDefined();
      })
    })
  })

  describe('이슈 제목 수정하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('이슈 제목 수정하기', async () => {
        const data = await issueService.titleUpdate(id, title);
        expect(data).toBeDefined();
      })
    })
  })

  describe('이슈 내용 수정하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('이슈 내용 수정하기', async () => {
        const data = await issueService.contentUpdate(id, content);
        expect(data).toBeDefined();
      })
    })
  })

  describe('이슈 담당자 수정하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('이슈 내용 수정하기', async () => {
        const data = await issueService.assigneesUpdate(id, assignees);
        expect(data).toBeDefined();
      })
    })
  })

  describe('이슈 레이블 수정하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('이슈 레이블 수정하기', async () => {
        const data = await issueService.labelsUpdate(id, labels);
        expect(data).toBeDefined();
      })
    })
  })

  describe('이슈 마일스톤 수정하기 SERVICE API TEST', ()=>{
    describe('이슈 SERVICE', ()=>{
  
      test('이슈 마일스톤 수정하기', async () => {
        const data = await issueService.milestoneUpdate(id, milestoneId);
        expect(data).toBeDefined();
      })
    })
  })
});

/* 슈퍼 테스트 */
describe('PUT /issue/title은', () => {
  const info = {
    "title" : "테스트 제목"
  }
  describe('성공시', () => {

    test('이슈 제목을 성공적으로 수정하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api/issue/title/1').send(info);
      expect(response.status).toEqual(200);
      done();
    })
  })
  
  describe('실패시', () => {
    
    test('이슈 제목이 존재하지 않으면 400을 반환한다.', async (done) => {
      info.title='';
      const response = await request(app)
      .put('/api/issue/title/1').send(info);
      expect(response.status).toEqual(400);
      done();
    })
  })
})

describe('PUT /issue/content는', () => {
  const info = {
    "content" : "테스트 내용"
  }
  describe('성공시', () => {

    test('이슈 내용을 성공적으로 수정하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api//issue/content/1').send(info);
      expect(response.status).toEqual(200);
      done();
    })
  })
  
  describe('실패시', () => {
    
    test('이슈 내용이 존재하지 않으면 400을 반환한다.', async (done) => {
      info.content='';
      const response = await request(app)
      .put('/api//issue/content/1').send(info);
      expect(response.status).toEqual(400);
      done();
    })
  })
})

describe('PUT /issue/assignees는', () => {
  const info = {
    "assignees" : [2,3]
  }
  describe('성공시', () => {

    test('이슈 담당자를 성공적으로 수정하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api//issue/assignees/1').send(info);
      expect(response.status).toEqual(200);
      done();
    })
  })
})

describe('PUT /issue/labels는', () => {
  const info = {
    "labels" : [2,3]
  }
  describe('성공시', () => {

    test('이슈 레이블을 성공적으로 수정하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .put('/api//issue/labels/1').send(info);
      expect(response.status).toEqual(200);
      done();
    })
  })

  describe('PUT /issue/milestone는', () => {
    const info = {
      "milestoneId" : 1
    }
    describe('성공시', () => {
  
      test('이슈 마일스톤을 성공적으로 수정하면 200을 반환한다.', async (done) => {
        const response = await request(app)
        .put('/api//issue/milestone/1').send(info);
        expect(response.status).toEqual(200);
        done();
      })
    })
  })
})