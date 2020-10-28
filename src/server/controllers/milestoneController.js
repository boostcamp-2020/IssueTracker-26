const milestoneController = (service) => {
  return {
    service,
    async createMilestone(req, res) {
      const { title, dueDate, description } = req.body;
      if (!title) {
        return res.status(400).end();
      }

      const milestoneId = await this.service.createMilestone({
        title,
        dueDate,
        description,
      });
      if (milestoneId) {
        return res.status(201).end();
      }
      return res.status(500).end();
    },
  };
};

module.exports = milestoneController;
