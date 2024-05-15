const express = require('express');
const userController = require('../controllers/userController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', requireRole(['owner', 'manager']), userController.getAllUsers);
router.post('/', requireRole(['owner']), userController.addUser);
router.put('/:id', requireRole(['owner', 'manager']), userController.updateUser);
router.delete('/:id', requireRole(['owner', 'manager']), userController.softDeleteUser);
router.get('/:user_id/roles', requireRole(['owner', 'manager']), userController.getUserRole);
router.put('/:user_id/roles', requireRole(['owner']), userController.updateUserRole);

module.exports = router;
