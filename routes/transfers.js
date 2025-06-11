const express = require('express');
const router = express.Router();
const transferController = require('../controllers/transferController');
const { authenticate } = require('../middleware/auth');
const { validateTransferRequest } = require('../middleware/validation');

router.post('/request', authenticate, validateTransferRequest, transferController.requestTransfer);
router.get('/', authenticate, transferController.getAllTransfers);
router.get('/my', authenticate, transferController.getMyTransfers);
router.post('/:id/approve', authenticate, transferController.approveTransfer);
router.post('/:id/reject', authenticate, transferController.rejectTransfer);
router.get('/:id', authenticate, transferController.getTransferById);

module.exports = router;