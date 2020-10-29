const milestoneService = (model) => {
  return {
    model,
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
  };
};

module.exports = milestoneService;
