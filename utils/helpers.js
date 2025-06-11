const crypto = require('crypto');

const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const randomString = (length = 16) => {
  return crypto.randomBytes(length).toString('hex');
};

module.exports = { formatDate, randomString };