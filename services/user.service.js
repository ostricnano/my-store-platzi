//const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {}

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hashedPassword,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: {
        email,
      },
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer'],
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { message: 'user deleted' + ' ' + id};
  }

}

module.exports = UserService;