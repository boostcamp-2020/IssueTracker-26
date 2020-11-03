/* eslint-disable */
require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const labelModel = require('../models/labelModel');
const labelService = require('../services/labelService');
const labelController = require('../controllers/labelController');

const createRes = (res) => {
  res.status = function (code) {
    this.code = code;
    return this;
  };
  res.end = function () {
    return this.code;
  };
  res.json = function (data) {
    return this.code;
  }
}

describe('label을 추가하는 api', () => {
  describe('Model Layer', () => {
    const labelInfo = {
      title: 'feat',
      description: 'feature label',
      color: '#000000'
    }
    test('label 정보가 모두 들어왔을 경우', async () => {
      expect(await labelModel.createLabel(labelInfo)).toBeGreaterThan(0);
    });

    const optionLabelInfo = {
      title: 'feat',
      description: '',
      color: '#000000'
    }
    test('label 옵션을 뺀 정보가 모두 들어왔을 경우', async () => {
      expect(await labelModel.createLabel(optionLabelInfo)).toBeGreaterThan(0);
    });

    const missLabelInfo = {
      color: '#000000'
    }

    test('label 필수 정보가 모두 들어오지 않을 경우', () => {
      expect(() => labelModel.createLabel(missLabelInfo).toThrow());
      // expect(await labelModel.createLabel(missLabelInfo)).toBeUndefined();
    });
    
    const wrongLabelInfo = {
      content: 'asdfasfd',
    }
    test('label 정보가 아닌 값이 들어왔을 경우', () => {
      expect(() => labelModel.createLabel(wrongLabelInfo).toThrow());
      // expect(await labelModel.createLabel(wrongLabelInfo)).toBeUndefined();
    });
  });

  describe('Service Layer', () => {
    const labelInfo = {
      title: 'feat',
      description: 'feature label',
      color: '#000000'
    }
    test('label 정보가 모두 들어왔을 경우', async () => {
      expect(await labelService.createLabel(labelInfo)).toBeGreaterThan(0);
    });

    const optionLabelInfo = {
      title: 'feat',
      description: '',
      color: '#000000'
    }
    test('label 옵션을 뺀 정보가 모두 들어왔을 경우', async () => {
      expect(await labelService.createLabel(optionLabelInfo)).toBeGreaterThan(0);
    });

    const missLabelInfo = {
      color: '#000000'
    }
    test('label 필수 정보가 모두 들어오지 않을 경우', () => {
      expect(() => labelService.createLabel(missLabelInfo).toThrow());
      // expect(await labelService.createLabel(missLabelInfo)).toBeUndefined();
    });

    const wrongLabelInfo = {
      content: 'asdfasfd',
    }
    test('label 정보가 아닌 값이 들어왔을 경우', () => {
      expect(() => labelService.createLabel(wrongLabelInfo).toThrow());
      // expect(await labelService.createLabel(wrongLabelInfo)).toBeUndefined();
    });
  });

  describe('Controller Layer', () => {
    const res = {};
    beforeAll(() => createRes(res));

    const req = { body: { title: 'feat', description: 'feature label', color: '#000000' } };
    test('label 정보가 모두 들어왔을 경우', async () => {
      const status = await labelController.createLabel(req, res);
      expect(status).toEqual(201);
    }); 

    const optionReq = { body: { title: 'feat', description: '', color: '#000000' } };
    test('label 옵션을 뺀 정보가 모두 들어왔을 경우', async () => {
      const status = await labelController.createLabel(optionReq, res);
      expect(status).toEqual(201);
    });

    const missRes = { body: { color: '#000000' } };
    test('label 필수 정보가 모두 들어오지 않을 경우', async () => {
      const status = await labelController.createLabel(missRes, res);
      expect(status).toEqual(400);
    });

    const wrongReq = { body: { content: 'feat' } };
    test('label 정보가 아닌 값이 들어왔을 경우', async () => {
      const status = await labelController.createLabel(wrongReq, res);
      expect(status).toEqual(400);
    });
  });
});

describe('label을 조회하는 api', () => {
  describe('Model Layer', () => {
    test('label 목록을 제대로 불러왔을 경우', async () => {
      const labelList = await labelService.getLabelList();
      expect(labelList).toBeDefined();
    }); 

    test('label 목록을 제대로 불러오지 못 했을 경우', async () => {
      expect(() => labelService.getLabelList().toThrow());
    });
  })
  
  describe('Service Layer', () => {
    test('label 목록을 제대로 불러왔을 경우', async () => {
      const labelList = await labelService.getLabelList();
      expect(labelList).toBeDefined();
    }); 

    test('label 목록을 제대로 불러오지 못 했을 경우', async () => {
      expect(() => labelService.getLabelList().toThrow());
    });
  })

  describe('Controller Layer', () => {
    const req = {};
    const res = {};
    beforeAll(() => createRes(res));

    test('label 목록을 제대로 불러왔을 경우', async () => {
      const status = await labelController.getLabelList(req, res);
      expect(status).toEqual(200);
    });
  });
});

describe('label을 수정하는 api', () => {
  describe('Model Layer', () => {
    const labelInfo = { title: 'feat', description: 'feature label', color: '#000000' };
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재', async () => {
      expect(await labelModel.updateLabel(1, labelInfo)).toBeGreaterThan(0);
    });

    const optionLabelInfo = {title: 'label', description: '', color: '#dfdfdf'};
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재 X', async () => {
      expect(await labelModel.updateLabel(1, optionLabelInfo)).toBeGreaterThan(0);
    });

    const missLabelInfo = { description: 'label one', color: '#dfdfdf'};
    test('수정할 label 정보가 잘못 된 경우', () => {
      expect(() => labelModel.updateLabel(1, missLabelInfo).toThrow());
    });

    const wrongLabelInfo = { content: 'body' };
    test('존재하지 않는 label id를 수정하려고 할 경우', () => {
      expect(() => labelModel.updateLabel(100, wrongLabelInfo).toThrow());
    });
  })

  describe('Service Layer', () => {
    const labelInfo = { title: 'feat', description: 'feature label', color: '#000000' };
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재', async () => {
      expect(await labelService.updateLabel(1, labelInfo)).toBeGreaterThan(0);
    });

    const optionLabelInfo = {title: 'label', description: '', color: '#dfdfdf'};
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재 X', async () => {
      expect(await labelService.updateLabel(1, optionLabelInfo)).toBeGreaterThan(0);
    });

    const missLabelInfo = { description: 'label one', color: '#dfdfdf'};
    test('수정할 label 정보가 잘못 된 경우', () => {
      expect(() => labelService.updateLabel(1, missLabelInfo).toThrow());
    });

    const wrongLabelInfo = { content: 'body' };
    test('존재하지 않는 label id를 수정하려고 할 경우', () => {
      expect(() => labelService.updateLabel(100, wrongLabelInfo).toThrow());
    });
  })

  describe('Controller Layer', () => {
    const res = {};
    beforeAll(() => createRes(res));

    const req = {params: {id: 1}, body: {title: 'label', description: 'label one', color: '#dfdfdf'}};
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재', async () => {
      const status = await labelController.updateLabel(req, res);
      expect(status).toEqual(200);
    });

    const optionReq = {params: {id: 1}, body: {title: 'label', description: '', color: '#dfdfdf'}};
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재 X', async () => {
      const status = await labelController.updateLabel(optionReq, res);
      expect(status).toEqual(200);
    });

    const missReq = {params: {id: 1}, body: { content: 'feat' }};
    test('수정할 label 정보가 잘못 된 경우', async () => {
      const status = await labelController.updateLabel(missReq, res);
      expect(status).toEqual(400);
    });

    const wrongReq = {params: {id: 1000}, body: {title: 'label', description: 'label one', color: '#dfdfdf'}};
    test('존재하지 않는 label id를 수정하려고 할 경우', async () => {
      const status = await labelController.updateLabel(wrongReq, res);
      expect(status).toEqual(404);
    });
  });

  describe('API 테스트', () => {
    const labelInfo = { title: 'feat', description: 'feature label', color: '#000000' };
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재', async (done) => {
      await request(app).put(`/api/label/1`).send(labelInfo).expect(200);
      done();
    });

    const optionLabelInfo = {title: 'label', description: '', color: '#dfdfdf'};
    test('존재하는 label id를 수정하려고 할 경우 - 옵션 값 존재 X', async (done) => {
      await request(app).put('/api/label/1').send(optionLabelInfo).expect(200);
      done();
    });

    const missLabelInfo = { description: 'label one', color: '#dfdfdf'};
    test('수정할 label 정보가 잘못 된 경우', async (done) => {
      await request(app).put('/api/label/1').send(missLabelInfo).expect(400);
      done();
    });

    const wrongLabelInfo = { content: 'body' };
    test('수정할 label 정보가 잘못 된 경우', async (done) => {
      await request(app).put('/api/label/1').send(wrongLabelInfo).expect(400);
      done();
    });

    test('존재하지 않는 label id를 수정하려고 할 경우', async (done) => {
      await request(app).put('/api/label/1000').send(labelInfo).expect(404);
      done();
    });
  });
});

/* test DB에 실제 존재하는 id 값으로 테스트 중 -> transaction rollback 적용 필요 */
describe('label을 삭제하는 api', () => {
  describe('Model Layer', () => {
    test('id값이 정상적으로 입력된 경우', async () => {
      expect(await labelModel.deleteLabel(17)).toBeGreaterThan(0);
    });

    test('id값이 숫자가 아닌 경우', async () => {
      expect(await labelModel.deleteLabel('asdf')).toBeUndefined();
    });
    
    test('없는 id값의 label을 삭제하는 경우', async () => {
      expect(await labelModel.deleteLabel(1000)).toEqual(0);
    });
  })
  
  describe('Service Layer', () => {
    test('id값이 정상적으로 입력된 경우', async () => {
      expect(await labelService.deleteLabel(16)).toBeGreaterThan(0);
    });

    test('id값이 숫자가 아닌 경우', async () => {
      expect(await labelService.deleteLabel('asdf')).toBeUndefined();
    });
    
    test('없는 id값의 label을 삭제하는 경우', async () => {
      expect(await labelService.deleteLabel(1000)).toEqual(0);
    });
  })

  describe('Controller Layer', () => {
    const res = {};
    beforeAll(() => createRes(res));

    const req = { params: { id: 15 } };
    test('id값이 정상적으로 입력된 경우', async () => {
      const status = await labelController.deleteLabel(req, res);
      expect(status).toEqual(205);
    });

    const strReq = { params: { id: 'asdf' } };
    test('id값이 숫자가 아닌 경우', async () => {
      const status = await labelController.deleteLabel(strReq, res);
      expect(status).toEqual(400);
    });
    
    const wrongReq = { params: { id: 1000 } };
    test('없는 id값의 label을 삭제하는 경우', async () => {
      const status = await labelController.deleteLabel(wrongReq, res);
      expect(status).toEqual(404);
    });
  });

  describe('API 테스트', () => {
    test('id값이 정상적으로 입력된 경우', async (done) => {
      await request(app).delete(`/api/label/14`).expect(205);
      done();
    });

    test('id값이 숫자가 아닌 경우', async (done) => {
      await request(app).delete('/api/label/asdf').expect(400);
      done();
    });
    
    test('없는 id값의 label을 삭제하는 경우', async (done) => {
      await request(app).delete('/api/label/1000').expect(404);
      done();
    });
  });
});