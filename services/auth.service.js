const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Invalid email or password');
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    return {
      message: 'Login success',
      code: 200,
      token,
      user,
    }
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Invalid email or password');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const link = `http://localhost:3000/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: 'ostricmariano@gmail.com',
      to: `${user.email}`,
      subject: "Email de recuperacion de contraseña",
      text: "Hello world?",
      html: `<b>Ingresa a este link => ${link} </b>`,
    }
    const rta = await this.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      console.log('payload', payload.sub)
      const user = await service.findOne(payload.sub);
      console.log('user', user)
      if (user.recoveryToken !== token){
        throw boom.unauthorized('Invalid token');
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash, recoveryToken: null });
      return {
        message: 'Password changed',
        code: 200
      }
    } catch (error) {
      throw boom.unauthorized('Invalid email');
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
          user: config.email,
          pass: config.password
      }
    });
    await transporter.sendMail(infoMail);
    return { messege: 'Email sent'}
  }
}

module.exports = AuthService;