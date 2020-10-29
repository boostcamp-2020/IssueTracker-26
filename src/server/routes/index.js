const router = require('express').Router();
const userRouter = require('./userRouter');
const milestoneRouter = require('./milestoneRouter');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);
router.use('/api', milestoneRouter);

module.exports = router;
