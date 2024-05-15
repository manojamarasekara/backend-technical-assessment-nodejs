const express = require('express');
const customerController = require('../controllers/customerController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', requireRole(['owner', 'manager', 'cashier']), customerController.getAllCustomers);
router.post('/', requireRole(['owner']), customerController.createCustomer);
router.get('/:customer_id', requireRole(['owner', 'manager', 'cashier']), customerController.getCustomerById);
router.put('/:customer_id', requireRole(['owner', 'manager', 'cashier']), customerController.updateCustomer);
router.patch('/:customer_id', requireRole(['owner', 'manager']), customerController.softDeleteCustomer);
router.delete('/:customer_id', requireRole(['owner']), customerController.deleteCustomer);

module.exports = router;
