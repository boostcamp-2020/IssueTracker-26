/* eslint-disable */
require('dotenv').config();
const model = {};
const milestoneServiceFn = require('../services/milestoneService');
const milestoneService = milestoneServiceFn(model);
const milestoneControllerFn = require('../controllers/milestoneController');
const milestoneModel = require('../models/milestoneModel');
const issueModel = require('../models/issueModel');
const app = require('../app');
const superTest = require('supertest');

describe('milestoneModel 테스트', () => {
  let insertId = null;
  test('milestone 생성', async () => {
    // const data = {
    //   title: 'test',
    //   dueDate: null,
    //   description: null,
    // };
    // insertId = await milestoneModel.createMilestone(data);
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
  test('milestone 삭제', async () => {
    // const id = insertId;
    // const deletedId = await milestoneModel.deleteMilestone(id);
    // expect(deletedId).toEqual(id);
  });
  test('milestone 가져오기', async () => {
    const milestoneLists = await milestoneModel.getMilestoneList();
    expect(milestoneLists instanceof Array).toEqual(true);
  });
  test('milestone id를 가진 issue들 가져오기', async () => {
    const milestoneId = 1;
    const issuesByMilestone = await milestoneModel.getIssueListByMilestoneId(
      milestoneId,
    );
    expect(issuesByMilestone instanceof Array).toEqual(true);
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

  describe('milestoneService : getMilestoneList', () => {
    test('모든 마일스톤 값을 불러온다.', async () => {
      const service = milestoneServiceFn(milestoneModel);
      const milestoneList = await service.getMilestoneList(issueModel);
      expect(milestoneList instanceof Array).toEqual(true);
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
    res.json = function (obj) {
      return { code: this.code, ...obj };
    };
    service.list = [1, 2, 3, 4];
    service.createMilestone = ({ title, dueDate, description }) => {
      if (title === 'ERROR') return Promise.resolve(undefined);
      return Promise.resolve(1);
    };
    service.updateMilestone = ({ id, title, dueDate, description }) => {
      return Promise.resolve(service.list.find((index) => index === id));
    };
    service.getMilestoneList = (err) => {
      return Promise.resolve([]);
    };
    service.deleteMilestone = async (id) => {
      return Promise.resolve(service.list.find((list) => list === id));
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

  describe('milestoneController : deleteMilestone', () => {
    test('id에 해당하는 milestone이 있으면 지우고 200 코드를 리턴한다.', async () => {
      req.params = { id: 1 };
      const status = await milestoneController.deleteMilestone(req, res);
      expect(status).toEqual(200);
    });
    test('id에 해당하는 milestone이 없으면 204 코드를 리턴한다.', async () => {
      req.params = { id: 999 };
      const status = await milestoneController.deleteMilestone(req, res);
      expect(status).toEqual(204);
    });
  });
  describe('milestoneController : getMilestoneList', () => {
    test('모든 마일스톤 목록을 불러오는데 성공한 경우 200을 리턴', async () => {
      const { code, milestones } = await milestoneController.getMilestoneList(
        req,
        res,
      );
      expect(code).toEqual(200);
      expect(milestones instanceof Array).toEqual(true);
    });
  });
});

describe('milestone API 테스트', () => {
  const request = superTest(app);
  describe('GET /api/milestone', () => {
    test('성공 시 200 리턴과 milestones arr를 가지는 객체 리턴', async () => {
      await request
        .get('/api/milestone')
        .expect(200)
        .then((response) =>
          expect(response.body.milestones instanceof Array).toEqual(true),
        );
    });
  });
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
        .put('/api/milestone/99')
        .send({ title: 'hho' });
      expect(response.status).toEqual(404);
    });
  });
  describe(`DELETE /api/milestone/`, () => {
    // test('성공 시 200 리턴', async () => {
    //   await request.delete('/api/milestone/5').expect(200);
    // });
    test('id가 존재하지 않는 경우 204 리턴', async () => {
      await request.delete('/api/milestone/99').expect(204);
    });
  });
});

/* 슈퍼 테스트 */
describe('GET /milestone/total은', () => {
  describe('성공시', () => {

    test('마일스톤의 총 개수를 성공적으로 리턴하면 200을 반환한다.', async (done) => {
      const response = await request(app)
      .get('/api/milestone/total').send();
      expect(response.status).toEqual(200);
      done();
    })
  })
})