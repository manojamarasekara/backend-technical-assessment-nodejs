const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/medications', inventoryController.getMedications);
router.post('/medications', inventoryController.addMedication);
router.get('/medications/:medication_id', inventoryController.getMedicationById);
router.put('/medications/:medication_id', inventoryController.updateMedication);
router.patch('/medications/:medication_id', inventoryController.softDeleteMedication);
router.delete('/medications/:medication_id', inventoryController.deleteMedication);
router.patch('/medications/:medication_id/adjust', inventoryController.adjustMedicationQuantity);

module.exports = router;
