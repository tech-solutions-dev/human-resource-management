const { Department, User } = require('../config/database');

// Create department (admin only)
const createDepartment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    const { name, code, description, manager_id, budget, location } = req.body;
    const department = await Department.create({ name, code, description, manager_id, budget, location });
    res.status(201).json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({ include: [{ model: User, as: 'manager', attributes: ['user_id', 'first_name', 'last_name'] }] });
    res.json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get department by id
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, { include: [{ model: User, as: 'manager', attributes: ['user_id', 'first_name', 'last_name'] }] });
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update department (admin only)
const updateDepartment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    const { name, code, description, manager_id, budget, location, is_active } = req.body;
    department.name = name || department.name;
    department.code = code || department.code;
    department.description = description || department.description;
    department.manager_id = manager_id || department.manager_id;
    department.budget = budget || department.budget;
    department.location = location || department.location;
    department.is_active = typeof is_active === 'boolean' ? is_active : department.is_active;
    await department.save();
    res.json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete department (admin only)
const deleteDepartment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Forbidden' });
    const department = await Department.findByPk(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    await department.destroy();
    res.json({ success: true, message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment };