const router = require('express').Router();
const userRouter = require('./userRouter');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', userRouter);

module.exports = router;
