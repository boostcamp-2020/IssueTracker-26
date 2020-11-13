const milestoneService = (model) => {
  return {
    model,
    async deleteMilestone(id) {
      try {
        const milestoneId = await this.model.deleteMilestone(id);
        return milestoneId;
      } catch (e) {
        return undefined;
      }
    },
    async getMilestoneList() {
      let milestoneList = await this.model.getMilestoneList();
      const issuesListsPromise = milestoneList.map((milestone) => {
        return this.model.getIssueListByMilestoneId(milestone.id);
      });
      const issuesLists = await Promise.all(issuesListsPromise);
      milestoneList = milestoneList.map((milestone, index) => ({
        ...milestone,
        issues: issuesLists[index],
      }));
      return milestoneList;
    },
    async getMilestoneById(id) {
      const milestone = await this.model.getMilestoneById(id);
      return milestone;
    },
    async createMilestone({ title, duedate, description }) {
      try {
        const milestoneId = await this.model.createMilestone({
          title,
          duedate,
          description,
        });
        return milestoneId;
      } catch (e) {
        return undefined;
      }
    },
    async updateMilestone({ id, title, duedate, description }) {
      try {
        const milestoneId = await this.model.updateMilestone({
          id,
          title,
          duedate,
          description,
        });
        return milestoneId;
      } catch (e) {
        return undefined;
      }
    },
    async getMilestoneTotal() {
      try {
        const total = await this.model.getMilestoneTotal();
        return total;
      } catch (e) {
        return undefined;
      }
    },
    async getMilestoneAll() {
      try {
        const list = await this.model.getMilestoneAll();
        return list;
      } catch (e) {
        return undefined;
      }
    },
    async stateChange(state, id) {
      try {
        const milestone = await this.model.stateChange(state ? 0 : 1, id);
        return milestone;
      } catch (e) {
        return undefined;
      }
    },
    async getMilestoneRatio(id) {
      try {
        const ratio = await this.model.getMilestoneRatio(id);
        return ratio;
      } catch (e) {
        return undefined;
      }
    },
    async getMilestoneWithRatio() {
      try {
        const milestone = await this.model.getMilestoneWithRatio();
        return milestone;
      } catch (e) {
        return undefined;
      }
    },
  };
};

module.exports = milestoneService;
