const router = require('express').Router();
const userRouter = require('./userRouter');
const labelRouter = require('./labelRouter');
const milestoneRouter = require('./milestoneRouter');
const issueRouter = require('./issueRouter');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);
router.use('/api', labelRouter);
router.use('/api', milestoneRouter);
router.use('/api', issueRouter);

module.exports = router;
