const router = require('express').Router();
const issueController = require('../controllers/issueController');

router.get('/issue', issueController.getIssueList);

module.exports = router;
