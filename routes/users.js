const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.patch('/:id/deactivate', authenticate, userController.deactivateUser);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;