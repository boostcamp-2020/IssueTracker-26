const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/user', userController.signUp);
<<<<<<< HEAD
router.post('/userName', userController.checkDuplicated);
=======
router.post('/user/signIn', userController.signIn);
>>>>>>> feat: userController signIn 구현

module.exports = router;
