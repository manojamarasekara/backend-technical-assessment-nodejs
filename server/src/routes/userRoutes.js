const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.softDeleteUser);
router.get('/:user_id/roles', userController.getUserRole);
router.put('/:user_id/roles', userController.updateUserRole);

module.exports = router;
