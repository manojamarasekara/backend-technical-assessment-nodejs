const express = require('express');
const customerController = require('../controllers/customerController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', requireRole(['Owner', 'Manager', 'Cashier']), customerController.getAllCustomers);
router.post('/', requireRole(['Owner']), customerController.createCustomer);
router.get('/:customer_id', requireRole(['Owner', 'Manager', 'Cashier']), customerController.getCustomerById);
router.put('/:customer_id', requireRole(['Owner', 'Manager', 'Cashier']), customerController.updateCustomer);
router.patch('/:customer_id', requireRole(['Owner', 'Manager']), customerController.softDeleteCustomer);
router.delete('/:customer_id', requireRole(['Owner']), customerController.deleteCustomer);

module.exports = router;
