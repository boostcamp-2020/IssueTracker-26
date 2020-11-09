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
    async getMilestoneList(issueModel) {
      let milestoneList = await this.model.getMilestoneList();
      const issuesListsPromise = milestoneList.map((milestone) => {
        return this.model.getIssueListByMilestoneId(milestone.id);
      });
      let issuesLists = await Promise.all(issuesListsPromise);
      const labelAndAssigneePromiseArr = issuesLists.map((issuesList) => {
        return issuesList.reduce((promiseArr, issue) => {
          promiseArr.push(issueModel.getIssueLabel(issue.id));
          promiseArr.push(issueModel.getIssueAssignee(issue.id));
          return promiseArr;
        }, []);
      });
      const labelAndAssigneeArr = await Promise.all(
        ...labelAndAssigneePromiseArr,
      );
      issuesLists = issuesLists.map((issuesList, index) => {
        return issuesList.map((issue) => {
          return {
            ...issue,
            label: labelAndAssigneeArr[index * 2],
            assignee: labelAndAssigneeArr[index * 2 + 1],
          };
        });
      });
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
    async getMilestoneAll() {
      try {
        const list = await this.model.getMilestoneAll();
        return list;
      } catch (e) {
        return undefined;
      }
    },
  };
};

module.exports = milestoneService;
