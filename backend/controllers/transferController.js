const { Transfer, User, Department } = require('../config/database');

// Request transfer
const requestTransfer = async (req, res) => {
  try {
    const { to_department_id, reason } = req.body;
    const user = req.user;
    const transfer = await Transfer.create({ user_id: user.user_id, from_department_id: user.department_id, to_department_id, reason });
    res.status(201).json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all transfers (admin/manager)
const getAllTransfers = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const transfers = await Transfer.findAll({ include: [{ model: User, as: 'employee', attributes: ['user_id', 'first_name', 'last_name'] }, { model: Department, as: 'fromDepartment' }, { model: Department, as: 'toDepartment' }] });
    res.json({ success: true, transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my transfers
const getMyTransfers = async (req, res) => {
  try {
    const transfers = await Transfer.findAll({ where: { user_id: req.user.user_id } });
    res.json({ success: true, transfers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve transfer (manager/admin)
const approveTransfer = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const transfer = await Transfer.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ success: false, message: 'Transfer not found' });
    transfer.status = 'approved';
    transfer.approved_by = req.user.user_id;
    await transfer.save();
    // Update user's department
    const user = await User.findByPk(transfer.user_id);
    user.department_id = transfer.to_department_id;
    await user.save();
    res.json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject transfer (manager/admin)
const rejectTransfer = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const transfer = await Transfer.findByPk(req.params.id);
    if (!transfer) return res.status(404).json({ success: false, message: 'Transfer not found' });
    transfer.status = 'rejected';
    transfer.approved_by = req.user.user_id;
    transfer.rejection_reason = req.body.rejection_reason || '';
    await transfer.save();
    res.json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get transfer by id
const getTransferById = async (req, res) => {
  try {
    const transfer = await Transfer.findByPk(req.params.id, { include: [{ model: User, as: 'employee', attributes: ['user_id', 'first_name', 'last_name'] }, { model: Department, as: 'fromDepartment' }, { model: Department, as: 'toDepartment' }] });
    if (!transfer) return res.status(404).json({ success: false, message: 'Transfer not found' });
    res.json({ success: true, transfer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { requestTransfer, getAllTransfers, getMyTransfers, approveTransfer, rejectTransfer, getTransferById };