const express = require('express');
const passport = require('passport');
const {
  loginSchema,
  recoverySchema,
  changePasswordSchema
} = require('./../schemas/auth.schemas');
const validateHandler = require('../middlewares/validator.handler');

const AuthService = require('./../services/auth.service');
const router = express.Router();

const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  validateHandler(loginSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log('user', user)
      delete user.dataValues.recoveryToken;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  validateHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  validateHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;