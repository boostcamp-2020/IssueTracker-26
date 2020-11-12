import HTTP from '../http-common';

const milestoneAPI = {};

milestoneAPI.getMilestoneRatio = (milestoneId) =>
  fetch(`${HTTP}api/milestone/ratio/${milestoneId}`).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return {};
  });

export default milestoneAPI;
