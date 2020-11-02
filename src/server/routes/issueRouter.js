const router = require('express').Router();
const issueController = require('../controllers/issueController');

router.get('/issue', issueController.getIssueList);
router.get('/issue/detail/:id', issueController.getIssueDetail);
router.post('/issue/', issueController.createIssue);
router.put('/issue/state/:id', issueController.stateChange);
router.put('/issue/title/:id', issueController.titleUpdate);
router.put('/issue/content/:id', issueController.contentUpdate);
router.put('/issue/assignees/:id', issueController.assigneesUpdate);
router.put('/issue/labels/:id', issueController.labelsUpdate);
router.put('/issue/milestone/:id', issueController.milestoneUpdate);

module.exports = router;
