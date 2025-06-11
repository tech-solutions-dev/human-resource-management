const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authenticate } = require('../middleware/auth');
const { validateLeaveRequest } = require('../middleware/validation');

router.post('/apply', authenticate, validateLeaveRequest, leaveController.applyLeave);
router.get('/', authenticate, leaveController.getAllLeaves);
router.get('/my', authenticate, leaveController.getMyLeaves);
router.post('/:id/approve', authenticate, leaveController.approveLeave);
router.post('/:id/reject', authenticate, leaveController.rejectLeave);
router.post('/:id/cancel', authenticate, leaveController.cancelLeave);
router.get('/:id', authenticate, leaveController.getLeaveById);

module.exports = router;