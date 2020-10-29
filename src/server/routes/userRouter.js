const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/user', userController.signUp);
router.post('/userName', userController.checkDuplicated);
router.post('/user/signIn', userController.signIn);

module.exports = router;
