const { verifyToken } = require('../config/jwt');
const { User } = require('../config/database');

// Authenticate user middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication token required'
      });
    }

    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.user_id, {
      include: [{ model: require('../config/database').Department, as: 'department' }]
    });

    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid or expired token'
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token'
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'Insufficient permissions'
      });
    }

    next();
  };
};

// Check if user can access resource
const checkResourceOwnership = (resourceUserIdField = 'user_id') => {
  return (req, res, next) => {
    const userId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    // Admin and HR can access all resources
    if (req.user.role === 'admin' || req.user.role === 'hr') {
      return next();
    }

    // Managers can access resources of their department employees
    if (req.user.role === 'manager') {
      // This would require additional logic to check department membership
      // For now, we'll allow it and implement the check in the controller
      return next();
    }

    // Regular employees can only access their own resources
    if (parseInt(userId) !== req.user.user_id) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'You can only access your own resources'
      });
    }

    next();
  };
};

// Check if user is department manager
const isDepartmentManager = async (req, res, next) => {
  try {
    const { Department } = require('../config/database');
    const departmentId = req.params.department_id || req.body.department_id;
    
    if (!departmentId) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Department ID required'
      });
    }

    const department = await Department.findByPk(departmentId);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'Department not found'
      });
    }

    // Admin and HR can manage all departments
    if (req.user.role === 'admin' || req.user.role === 'hr') {
      return next();
    }

    // Check if user is the department manager
    if (department.manager_id !== req.user.user_id) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden',
        message: 'You are not authorized to manage this department'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error checking department manager authorization'
    });
  }
};

// Optional authentication (for public endpoints that might benefit from user context)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.user_id);
      
      if (user && user.is_active) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

module.exports = {
  authenticate,
  authorize,
  checkResourceOwnership,
  isDepartmentManager,
  optionalAuth
};