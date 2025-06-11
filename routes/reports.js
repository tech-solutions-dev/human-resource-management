const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middleware/auth');

router.get('/leaves', authenticate, reportController.leaveSummary);
router.get('/transfers', authenticate, reportController.transferSummary);
router.get('/users-by-department', authenticate, reportController.userCountByDepartment);

module.exports = router;