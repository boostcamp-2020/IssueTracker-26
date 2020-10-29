const router = require('express').Router();
const labelController = require('../controllers/labelController');

router.post('/label', labelController.createLabel);

module.exports = router;
