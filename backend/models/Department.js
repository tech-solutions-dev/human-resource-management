const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Department = sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 100],
        notEmpty: true
      }
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 10],
        notEmpty: true,
        isUppercase: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'departments',
    indexes: [
      {
        fields: ['name']
      },
      {
        fields: ['code']
      },
      {
        fields: ['manager_id']
      }
    ]
  });

  // Instance methods
  Department.prototype.getEmployeeCount = async function() {
    const User = sequelize.models.User;
    return await User.count({
      where: {
        department_id: this.department_id,
        is_active: true
      }
    });
  };

  return Department;
};