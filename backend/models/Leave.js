const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Leave = sequelize.define('Leave', {
    leave_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    leave_type: {
      type: DataTypes.ENUM('annual', 'sick', 'casual', 'maternity', 'paternity', 'other'),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rejection_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false
    }
  }, {
    tableName: 'leaves',
    timestamps: true
  });

  return Leave;
};