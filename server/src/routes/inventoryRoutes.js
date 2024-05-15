const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/medications', requireRole(['owner', 'manager', 'cashier']), inventoryController.getMedications);
router.post('/medications', requireRole(['owner']), inventoryController.addMedication);
router.get('/medications/:medication_id', requireRole(['owner', 'manager', 'cashier']), inventoryController.getMedicationById);
router.put('/medications/:medication_id', requireRole(['owner', 'manager', 'cashier']), inventoryController.updateMedication);
router.patch('/medications/:medication_id', requireRole(['owner', 'manager']), inventoryController.softDeleteMedication);
router.delete('/medications/:medication_id', requireRole(['owner']), inventoryController.deleteMedication);
router.patch('/medications/:medication_id/adjust', requireRole(['owner', 'manager', 'cashier']), inventoryController.adjustMedicationQuantity);

module.exports = router;
