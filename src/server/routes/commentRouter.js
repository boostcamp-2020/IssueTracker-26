const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.post('/comment', commentController.create);

module.exports = router;
