const router = require('express').Router();
const labelController = require('../controllers/labelController');

router.post('/label', labelController.createLabel);
router.get('/label', labelController.getLabelList);
router.put('/label/:id', labelController.updateLabel);
router.delete('/label/:id', labelController.deleteLabel);
router.get('/label/total', labelController.getLabelTotal);

module.exports = router;
