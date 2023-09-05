const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey (req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apikey) {
    next();
  }
  next(boom.unauthorized('Invalid api key'));
}

function checkAdminRole (req, res, next) {
  console.log(req.user)
  const user = req.user;
  if (user.role === 'admin') {
    next();
  }
  next(boom.unauthorized('Invalid role'));
}

function checkRoles (...roles) {
  return (req, res, next) => {
    const user = req.user;
    console.log(roles)
    if (roles.includes(user.role)) {
      next();
    }
    next(boom.unauthorized('Invalid role'));
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };

