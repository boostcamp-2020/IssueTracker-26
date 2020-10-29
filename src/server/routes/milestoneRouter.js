const router = require('express').Router();
const milestoneModel = require('../models/milestoneModel');
const milestoneService = require('../services/milestoneService')(
  milestoneModel,
);
const milestoneController = require('../controllers/milestoneController')(
  milestoneService,
);

router.post(
  '/milestone',
  milestoneController.createMilestone.bind(milestoneController),
);

module.exports = router;
