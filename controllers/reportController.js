const { Leave, Transfer, User, Department } = require('../config/database');
const { Op } = require('sequelize');

// Leave summary report
const leaveSummary = async (req, res) => {
  try {
    const summary = await Leave.findAll({
      attributes: ['status', [Leave.sequelize.fn('COUNT', Leave.sequelize.col('leave_id')), 'count']],
      group: ['status']
    });
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Transfer summary report
const transferSummary = async (req, res) => {
  try {
    const summary = await Transfer.findAll({
      attributes: ['status', [Transfer.sequelize.fn('COUNT', Transfer.sequelize.col('transfer_id')), 'count']],
      group: ['status']
    });
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// User count by department
const userCountByDepartment = async (req, res) => {
  try {
    const summary = await User.findAll({
      attributes: ['department_id', [User.sequelize.fn('COUNT', User.sequelize.col('user_id')), 'count']],
      group: ['department_id'],
      include: [{ model: Department, as: 'department', attributes: ['name'] }]
    });
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { leaveSummary, transferSummary, userCountByDepartment };