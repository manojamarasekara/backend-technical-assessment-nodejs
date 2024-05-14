const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.get('/', customerController.getAllCustomers);
router.post('/', customerController.createCustomer);
router.get('/:customer_id', customerController.getCustomerById);
router.put('/:customer_id', customerController.updateCustomer);
router.patch('/:customer_id', customerController.softDeleteCustomer);
router.delete('/:customer_id', customerController.deleteCustomer);

module.exports = router;
