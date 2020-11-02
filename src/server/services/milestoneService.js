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
  };
};

module.exports = milestoneService;
