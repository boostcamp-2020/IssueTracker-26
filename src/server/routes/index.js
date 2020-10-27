const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index');
});

router.use('/api', (req, res, next) => {
  next();
});

module.exports = router;
