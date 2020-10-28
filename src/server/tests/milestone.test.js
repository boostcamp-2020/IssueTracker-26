/* eslint-disable */
const model = {};
const milestoneService = require('../services/milestoneService')(model);

describe('milestoneService 테스트', () => {
  describe('milestoneService : createMilestone', () => {
    beforeEach(() => {
      model.createMilestone = ({ title, dueDate, description }) => {
        if (!title) return Promise.resolve(undefined);
        return Promise.resolve(1);
      };
    });
    describe('milestone 생성 title은 필수 due date와 description은 선택.', () => {
      test('milestone 생성', async () => {
        const milestoneId = await milestoneService.createMilestone({
          title: 'aa',
        });
        expect(milestoneId).toBeDefined(undefined);
      });
    });
    describe('milestone 생성 실패 시에는 undefined를 반환한다.', () => {
      test('model에서 오류 혹은 올바른 값을 가져오지 못한 경우 undefined를 리턴.', async () => {
        const milestoneId = await milestoneService.createMilestone({
          titie: '',
        });
        expect(milestoneId).toBeUndefined(undefined);
      });
    });
  });
});
