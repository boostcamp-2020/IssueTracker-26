const router = require('express').Router();
const userRouter = require('./userRouter');
const labelRouter = require('./labelRouter');
const milestoneRouter = require('./milestoneRouter');
const issueRouter = require('./issueRouter');
const commentRouter = require('./commentRouter');
const { passportJWTAuth } = require('../util/middleware');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);
router.use('/api', passportJWTAuth, labelRouter);
router.use('/api', passportJWTAuth, milestoneRouter);
router.use('/api', passportJWTAuth, issueRouter);
router.use('/api', passportJWTAuth, commentRouter);

module.exports = router;
