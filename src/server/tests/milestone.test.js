/* eslint-disable */
require('dotenv').config();
const model = {};
const milestoneService = require('../services/milestoneService')(model);
const milestoneControllerFn = require('../controllers/milestoneController');
const milestoneModel = require('../models/milestoneModel');
const app = require('../app');
const superTest = require('supertest');

describe('milestoneModel 테스트', () => {
  test('milestone 생성', async () => {
    const data = {
      title: 'test',
      dueDate: null,
      description: null,
    };
    // const insertId = await milestoneModel.createMilestone(data);
    // expect(insertId).toBeDefined();
  });
  test('milestone 수정', async () => {
    const data = {
      id: 1,
      title: 'updated!',
      dueDate: null,
      description: null,
    };
    const updatedId = await milestoneModel.updateMilestone(data);
    expect(updatedId).toBeDefined();
  });
});

beforeAll(() => {
  model.list = [1, 2, 3];
  model.createMilestone = ({ title, dueDate, description }) => {
    if (!title) return Promise.resolve(undefined);
    return Promise.resolve(1);
  };
  model.updateMilestone = ({ id, title, dueDate, description }) => {
    return Promise.resolve(model.list.find((list) => list === id));
  };
  model.deleteMilestone = (id) => {
    return Promise.resolve(model.list.find((list) => list === id));
  };
});

describe('milestoneService 테스트', () => {
  describe('milestoneService : createMilestone', () => {
    describe('milestone 생성 title은 필수 due date와 description은 선택.', () => {
      test('milestone 생성', async () => {
        const milestoneId = await milestoneService.createMilestone({
          title: 'aa',
        });
        expect(milestoneId).toBeDefined();
      });
    });
    describe('milestone 생성 실패 시에는 undefined를 반환한다.', () => {
      test('model에서 오류 혹은 올바른 값을 가져오지 못한 경우 undefined를 리턴.', async () => {
        const milestoneId = await milestoneService.createMilestone({
          titie: '',
        });
        expect(milestoneId).toBeUndefined();
      });
    });
  });

  describe('milestoneService : updateMilestone', () => {
    describe('id와 일치하는 마일스톤을 찾아 수정한다.', () => {
      test('id와 일치하는 마일스톤의 값을 수정 후 수정된 milestone의 id를 리턴한다.', async () => {
        const id = 1;
        const title = 'updated';
        const milestoneId = await milestoneService.updateMilestone({
          id,
          title,
        });
        expect(id).toEqual(milestoneId);
      });
    });
    test('id와 일치하는 마일스톤이 없는 경우 undefined를 리턴한다', async () => {
      const id = 4;
      const title = 'notfound';
      const milestoneId = await milestoneService.updateMilestone({ id, title });
      expect(milestoneId).toBeUndefined();
    });
  });

  describe('milestoneService : deleteMilestone', () => {
    test('해당하는 id의 마일스톤을 찾아 삭제한다. 삭제한 후에 삭제된 milestone id를 리턴한다.', async () => {
      const id = 3;
      const milestoneId = await milestoneService.deleteMilestone(id);
      expect(milestoneId).toEqual(id);
    });
    test('해당하는 id의 마일스톤이 없는 경우 undefined를 리턴한다.', async () => {
      const id = 999;
      const milestoneId = await milestoneService.deleteMilestone(id);
      expect(milestoneId).toBeUndefined();
    });
  });
});

describe('milestoneController 테스트', () => {
  const req = {};
  const res = {};
  const service = {};
  let milestoneController = null;
  beforeAll(() => {
    res.status = function (code) {
      this.code = code;
      return this;
    };
    res.end = function () {
      return this.code;
    };
    service.list = [1, 2, 3, 4];
    service.createMilestone = ({ title, dueDate, description }) => {
      if (title === 'ERROR') return undefined;
      return 1;
    };
    service.updateMilestone = ({ id, title, dueDate, description }) => {
      return service.list.find((index) => index === id);
    };
    milestoneController = milestoneControllerFn(service);
  });
  describe('milestoneController : createMilestone', () => {
    test('title이 없는 경우 상태코드 400를 리턴한다.', async () => {
      req.body = { title: '' };
      const status = await milestoneController.createMilestone(req, res);
      expect(status).toEqual(400);
    });
    test('milestone 생성에 성공한 경우 상태코드 201를 리턴한다.', async () => {
      req.body = {
        title: 'Success',
      };
      const status = await milestoneController.createMilestone(req, res);
      expect(status).toEqual(201);
    });
    test('milestone 생성에 실패한 경우 상태코드 500을 리턴한다.', async () => {
      req.body = {
        title: 'ERROR',
      };
      const status = await milestoneController.createMilestone(req, res);
      expect(status).toEqual(500);
    });
  });

  describe('milestoneController : updateMilestone', () => {
    test('id에 해당하는 milestone이 있는 경우 상태코드 200을 리턴한다.', async () => {
      req.params = { id: 1 };
      req.body = { title: 'hhoho' };
      const status = await milestoneController.updateMilestone(req, res);
      expect(status).toEqual(200);
    });
    test('id에 해당하는 milestone이 없는 경우 상태코드 404을 리턴한다', async () => {
      req.params = { id: 10 };
      req.body = { title: 'asdf' };
      const status = await milestoneController.updateMilestone(req, res);
      expect(status).toEqual(404);
    });
    test('id가 params로 넘어오지 않으면 400을 리턴한다.', async () => {
      req.params = {};
      req.body = { title: 'test123' };
      const status = await milestoneController.updateMilestone(req, res);
      expect(status).toEqual(400);
    });
    test('title이 body로 넘어오지 않으면 400을 리턴한다.', async () => {
      req.params = { id: 1 };
      req.body = {};
      const status = await milestoneController.updateMilestone(req, res);
      expect(status).toEqual(400);
    });
  });
});

describe('milestone API 테스트', () => {
  const request = superTest(app);
  describe('POST /api/milestone', () => {
    test('성공 시 200 리턴', async () => {
      // const response = await request
      //   .post('/api/milestone')
      //   .send({ title: 'supertest' });
      // expect(response.status).toEqual(201);
    });
    test('title이 없는 경우 400 리턴', async () => {
      const response = await request.post('/api/milestone').send({});
      expect(response.status).toEqual(400);
    });
  });

  describe('PUT /api/milestone', () => {
    test('성공 시 200 리턴', async () => {
      const response = await request
        .put('/api/milestone/1')
        .send({ title: 'hi' });
      expect(response.status).toEqual(200);
    });
    test('실패 : title이 주어지지 않은 경우 400 리턴', async () => {
      const response = await request.put('/api/milestone/1').send({});
      expect(response.status).toEqual(400);
    });
    test('실패 : 해당 id에 대한 마일스톤이 없는 경우 404 리턴', async () => {
      const response = await request
        .put('/api/milestone/9999')
        .send({ title: 'hho' });
      expect(response.status).toEqual(404);
    });
  });
});
