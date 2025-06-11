const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticate } = require('../middleware/auth');
const { validateDepartment } = require('../middleware/validation');

router.post('/', authenticate, validateDepartment, departmentController.createDepartment);
router.get('/', authenticate, departmentController.getAllDepartments);
router.get('/:id', authenticate, departmentController.getDepartmentById);
router.put('/:id', authenticate, validateDepartment, departmentController.updateDepartment);
router.delete('/:id', authenticate, departmentController.deleteDepartment);

module.exports = router;