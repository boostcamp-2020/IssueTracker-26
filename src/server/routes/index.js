const router = require('express').Router();
const userRouter = require('./userRouter');
const issueRouter = require('./issueRouter');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);
router.use('/api', issueRouter);

module.exports = router;
