const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    notification_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('leave', 'transfer', 'user', 'other'),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    related_resource_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    resource_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'notifications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Notification;
};
