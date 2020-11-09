const router = require('express').Router();
const userController = require('../controllers/userController');
const { passportJWTAuth } = require('../util/middleware');

// public routes
router.post('/user/signIn', userController.signIn);
router.post('/user', userController.signUp);
router.post('/userName', userController.checkDuplicated);
router.post('/auth/github', userController.gitHubAuth);

// private routes
router.get('/user', passportJWTAuth, userController.getUserInfo);

module.exports = router;
