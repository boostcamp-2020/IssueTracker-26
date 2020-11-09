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
    async createMilestone({ title, dueDate, description }) {
      try {
        const milestoneId = await this.model.createMilestone({
          title,
          dueDate,
          description,
        });
        return milestoneId;
      } catch (e) {
        return undefined;
      }
    },
    async updateMilestone({ id, title, dueDate, description }) {
      try {
        const milestoneId = await this.model.updateMilestone({
          id,
          title,
          dueDate,
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
  };
};

module.exports = milestoneService;
