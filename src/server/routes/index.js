const router = require('express').Router();
const userRouter = require('./userRouter');
const labelRouter = require('./labelRouter');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);
router.use('/api', labelRouter);

module.exports = router;
