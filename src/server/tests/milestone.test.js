/* eslint-disable */
require('dotenv').config();
const model = {};
const milestoneService = require('../services/milestoneService')(model);
const milestoneControllerFn = require('../controllers/milestoneController');
const milestoneModel = require('../models/milestoneModel');

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
});

describe('milestoneController 테스트', () => {
  describe('milestoneController : createMilestone', () => {
    const req = {};
    const res = {};
    const service = {
      createMilestone({ title, dueDate, description }) {
        if (title === 'ERROR') return undefined;
        return 1;
      },
    };
    const milestoneController = milestoneControllerFn(service);
    beforeAll(() => {
      res.status = function (code) {
        this.code = code;
        return this;
      };
      res.end = function () {
        return this.code;
      };
    });
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
});
