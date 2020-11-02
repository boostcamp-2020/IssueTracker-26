const router = require('express').Router();
const milestoneModel = require('../models/milestoneModel');
const milestoneService = require('../services/milestoneService')(
  milestoneModel,
);
const milestoneController = require('../controllers/milestoneController')(
  milestoneService,
);

router.get(
  '/milestone',
  milestoneController.getMilestoneList.bind(milestoneController),
);

router.post(
  '/milestone',
  milestoneController.createMilestone.bind(milestoneController),
);

router.put(
  '/milestone/:id',
  milestoneController.updateMilestone.bind(milestoneController),
);

module.exports = router;
