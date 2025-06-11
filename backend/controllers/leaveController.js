const { Leave, User } = require('../config/database');

// Apply for leave
const applyLeave = async (req, res) => {
  try {
    const { leave_type, start_date, end_date, reason } = req.body;
    const year = new Date(start_date).getFullYear().toString();
    const leave = await Leave.create({ user_id: req.user.user_id, leave_type, start_date, end_date, reason, year });
    res.status(201).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all leaves (admin/manager)
const getAllLeaves = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const leaves = await Leave.findAll({ include: [{ model: User, as: 'employee', attributes: ['user_id', 'first_name', 'last_name'] }] });
    res.json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my leaves
const getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({ where: { user_id: req.user.user_id } });
    res.json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve leave (manager/admin)
const approveLeave = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });
    leave.status = 'approved';
    leave.approved_by = req.user.user_id;
    await leave.save();
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject leave (manager/admin)
const rejectLeave = async (req, res) => {
  try {
    if (!['admin', 'manager'].includes(req.user.role)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const leave = await Leave.findByPk(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });
    leave.status = 'rejected';
    leave.approved_by = req.user.user_id;
    leave.rejection_reason = req.body.rejection_reason || '';
    await leave.save();
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel leave (employee)
const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id);
    if (!leave || leave.user_id !== req.user.user_id) return res.status(404).json({ success: false, message: 'Leave not found' });
    leave.status = 'cancelled';
    await leave.save();
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get leave by id
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findByPk(req.params.id, { include: [{ model: User, as: 'employee', attributes: ['user_id', 'first_name', 'last_name'] }] });
    if (!leave) return res.status(404).json({ success: false, message: 'Leave not found' });
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { applyLeave, getAllLeaves, getMyLeaves, approveLeave, rejectLeave, cancelLeave, getLeaveById };