const router = require('express').Router();
const issueController = require('../controllers/issueController');

router.get('/issue', issueController.getIssueList);
router.get('/issue/detail/:id', issueController.getIssueDetail);
router.post('/issue/', issueController.createIssue);
router.put('/issue/state', issueController.stateChange);

module.exports = router;
