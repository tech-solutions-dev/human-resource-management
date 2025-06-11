const { User, Department } = require('../config/database');
const { generateToken, generateRefreshToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');

// Register a new user (Admin only)
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      role = 'employee',
      department_id,
      employment_type = 'full-time',
      salary,
      phone,
      address
    } = req.body;

    // Only admin can register
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'User with this username or email already exists'
      });
    }

    // Validate department exists if provided
    if (department_id) {
      const department = await Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid department ID'
        });
      }
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
      role,
      department_id,
      employment_type,
      salary,
      phone,
      address,
      hire_date: new Date()
    });

    res.status(201).json({
      success: true,
      data: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        is_active: user.is_active
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error creating user account'
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username or email
    const user = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { username },
          { email: username }
        ],
        is_active: true
      },
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['department_id', 'name', 'code']
        }
      ]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid credentials'
      });
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid credentials'
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save();

    // Generate tokens
    const tokenPayload = {
      user_id: user.user_id,
      username: user.username,
      role: user.role,
      department_id: user.department_id
    };

    const token = generateToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    res.json({
      success: true,
      data: {
        token,
        refresh_token: refreshToken,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          department: user.department,
          employment_type: user.employment_type,
          last_login: user.last_login
        }
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error during login process'
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['department_id', 'name', 'code', 'description']
        }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User profile not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error retrieving user profile'
    });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone,
      address
    } = req.body;

    const user = await User.findByPk(req.user.user_id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Check if email is being changed and is unique
    if (email && email !== user.email) {
      const existingUser = await User.findOne({
        where: {
          email,
          user_id: { [User.sequelize.Sequelize.Op.ne]: user.user_id }
        }
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Email address is already in use'
        });
      }
    }

    // Update user fields
    const updateData = {};
    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    await user.update(updateData);

    res.json({
      success: true,
      data: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        address: user.address
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error updating user profile'
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    const user = await User.findByPk(req.user.user_id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Validate current password
    const isCurrentPasswordValid = await user.validatePassword(current_password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = new_password;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error changing password'
    });
  }
};

// Refresh token
const refreshToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Refresh token is required'
      });
    }

    const { verifyToken } = require('../config/jwt');
    const decoded = verifyToken(refresh_token);

    const user = await User.findByPk(decoded.user_id);
    if (!user || !user.is_active) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Invalid refresh token'
      });
    }

    const tokenPayload = {
      user_id: user.user_id,
      username: user.username,
      role: user.role,
      department_id: user.department_id
    };

    const newToken = generateToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);

    res.json({
      success: true,
      data: {
        token: newToken,
        refresh_token: newRefreshToken
      }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired refresh token'
    });
  }
};

// Logout (optional - for token blacklisting if implemented)
const logout = async (req, res) => {
  try {
    // To be implemented later

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error logging out'
    });
  }
};

// Secret API to create an admin (no auth required)
const createSecretAdmin = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      department_id,
      employment_type = 'full-time',
      salary,
      phone,
      address
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [User.sequelize.Sequelize.Op.or]: [
          { username },
          { email }
        ]
      }
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'User with this username or email already exists'
      });
    }

    // Validate department exists if provided
    if (department_id) {
      const department = await Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Invalid department ID'
        });
      }
    }

    // Create admin user
    const user = await User.create({
      username,
      email,
      password,
      first_name,
      last_name,
      role: 'admin',
      department_id,
      employment_type,
      salary,
      phone,
      address,
      hire_date: new Date()
    });

    res.status(201).json({
      success: true,
      data: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
        department_id: user.department_id,
        is_active: user.is_active
      },
      message: 'Admin user created successfully'
    });
  } catch (error) {
    console.error('Secret admin creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: 'Error creating admin user'
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  refreshToken,
  logout,
  createSecretAdmin
};