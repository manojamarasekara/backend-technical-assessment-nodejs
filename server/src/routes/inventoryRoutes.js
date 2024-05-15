const express = require('express');
const inventoryController = require('../controllers/inventoryController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/medications', requireRole(['Owner', 'Manager', 'Cashier']), inventoryController.getMedications);
router.post('/medications', requireRole(['Owner']), inventoryController.addMedication);
router.get('/medications/:medication_id', requireRole(['Owner', 'Manager', 'Cashier']), inventoryController.getMedicationById);
router.put('/medications/:medication_id', requireRole(['Owner', 'Manager', 'Cashier']), inventoryController.updateMedication);
router.patch('/medications/:medication_id', requireRole(['Owner', 'Manager']), inventoryController.softDeleteMedication);
router.delete('/medications/:medication_id', requireRole(['Owner']), inventoryController.deleteMedication);
router.patch('/medications/:medication_id/adjust', requireRole(['Owner', 'Manager', 'Cashier']), inventoryController.adjustMedicationQuantity);

module.exports = router;
