const router = require('express').Router();
const issueController = require('../controllers/issueController');

router.get('/issue', issueController.getIssueList);
router.get('/issue/detail/:id', issueController.getIssueDetail);
router.post('/issue/', issueController.createIssue);
router.put('/issue/state/:id', issueController.stateChange);
router.put('/issue/title/:id', issueController.titleUpdate);

module.exports = router;
