const { Notification, User } = require('../config/database');

// Create a notification
const createNotification = async ({ user_id, type, message, related_resource_id, resource_type }) => {
  return Notification.create({ user_id, type, message, related_resource_id, resource_type });
};

// Get notifications for a user
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.user_id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification || notification.user_id !== req.user.user_id) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    notification.is_read = true;
    await notification.save();
    res.json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createNotification, getNotifications, markAsRead };
