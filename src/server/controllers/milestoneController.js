const issueModel = require('../models/issueModel');

const milestoneController = (service) => {
  return {
    service,
    async deleteMilestone(req, res) {
      const { id } = req.params;
      const milestoneId = await this.service.deleteMilestone(id);
      if (milestoneId) return res.status(200).end();
      return res.status(204).end();
    },
    async getMilestoneList(req, res) {
      const milestones = await service.getMilestoneList(issueModel);

      if (milestones) return res.status(200).json({ milestones });
      return res.status(500).end();
    },
    async getMilestoneById(req, res) {
      const { id } = req.params;
      if (!id) return res.status(400).end();

      const milestone = await service.getMilestoneById(id);
      if (milestone) return res.status(200).json({ milestone });
      return res.status(500).end();
    },
    async createMilestone(req, res) {
      const { title, dueDate = null, description = null } = req.body;
      if (!title) {
        return res.status(400).end();
      }
      const milestoneId = await this.service.createMilestone({
        title,
        dueDate,
        description,
      });
      if (milestoneId) return res.status(201).end();

      return res.status(500).end();
    },
    async updateMilestone(req, res) {
      const { id } = req.params;
      const { title, dueDate = null, description = null } = req.body;
      if (!title || !id) return res.status(400).end();
      const affectedRow = await this.service.updateMilestone({
        id,
        title,
        dueDate,
        description,
      });
      if (affectedRow) return res.status(200).end();
      return res.status(404).end();
    },
    async getMilestoneTotal(req, res) {
      const total = await this.service.getMilestoneTotal();
      if (total) return res.status(200).json(total);
      return res.status(404).end();
    },
    async getMilestoneAll(req, res) {
      const list = await this.service.getMilestoneAll();
      if (list) return res.status(200).json(list);
      return res.status(404).end();
    },
    async stateChange(req, res) {
      const id = parseInt(req.params.id, 10);
      const { state } = req.body;
      if (Number.isNaN(id)) return res.status(400).end();

      const milestone = await this.service.stateChange(state, id);
      if (milestone) return res.status(200).json(milestone);
      return res.status(500).end();
    },
    async getMilestoneRatio(req, res) {
      const { id } = req.params;
      const ratio = await this.service.getMilestoneRatio(id);
      if (ratio) return res.status(200).json(ratio);
      return res.status(404).end();
    },
    async getMilestoneWithRatio(req, res) {
      const milestone = await this.service.getMilestoneWithRatio();
      if (milestone) return res.status(200).json(milestone);
      return res.status(404).end();
    },
  };
};

module.exports = milestoneController;
