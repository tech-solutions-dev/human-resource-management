const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'hrms',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Import models
const User = require('../models/User')(sequelize);
const Department = require('../models/Department')(sequelize);
const Leave = require('../models/Leave')(sequelize);
const Transfer = require('../models/Transfer')(sequelize);
const Notification = require('../models/Notification')(sequelize);

// Define associations
const setupAssociations = () => {
  // Department - User associations
  Department.hasMany(User, { 
    foreignKey: 'department_id', 
    as: 'employees' 
  });
  User.belongsTo(Department, { 
    foreignKey: 'department_id', 
    as: 'department' 
  });

  // Department - Manager association
  Department.belongsTo(User, { 
    foreignKey: 'manager_id', 
    as: 'manager' 
  });

  // User - Leave associations
  User.hasMany(Leave, { 
    foreignKey: 'user_id', 
    as: 'leaves' 
  });
  Leave.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'employee' 
  });

  // Leave - Approver association
  Leave.belongsTo(User, { 
    foreignKey: 'approved_by', 
    as: 'approver' 
  });

  // User - Transfer associations
  User.hasMany(Transfer, { 
    foreignKey: 'user_id', 
    as: 'transfers' 
  });
  Transfer.belongsTo(User, { 
    foreignKey: 'user_id', 
    as: 'employee' 
  });

  // Transfer - Department associations
  Transfer.belongsTo(Department, { 
    foreignKey: 'from_department_id', 
    as: 'fromDepartment' 
  });
  Transfer.belongsTo(Department, { 
    foreignKey: 'to_department_id', 
    as: 'toDepartment' 
  });

  // Transfer - Approver association
  Transfer.belongsTo(User, { 
    foreignKey: 'approved_by', 
    as: 'approver' 
  });
};

setupAssociations();

module.exports = {
  sequelize,
  User,
  Department,
  Leave,
  Transfer,
  Notification
};