const express = require('express');
const userController = require('../controllers/userController');
const { requireRole } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', requireRole(['Owner', 'Manager']), userController.getAllUsers);
router.post('/', requireRole(['Owner']), userController.addUser);
router.put('/:id', requireRole(['Owner', 'Manager']), userController.updateUser);
router.patch('/:id', requireRole(['Owner', 'Manager']), userController.softDeleteUser);
router.delete('/:id', requireRole(['Owner', 'Manager']), userController.deleteUser);
router.get('/:user_id/roles', requireRole(['Owner', 'Manager']), userController.getUserRole);
router.put('/:user_id/roles', requireRole(['Owner']), userController.updateUserRole);

module.exports = router;
