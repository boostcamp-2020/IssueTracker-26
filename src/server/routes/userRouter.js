const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/user', userController.signUp);
router.post('/userName', userController.checkDuplicated);

module.exports = router;
