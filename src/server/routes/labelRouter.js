const router = require('express').Router();
const labelController = require('../controllers/labelController');

router.post('/label', labelController.createLabel);
router.get('/label', labelController.getLabelList);

module.exports = router;
