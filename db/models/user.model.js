const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token'
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model {

  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }

//configurar el hash de la contraseña
// ahorra hacer el hass en el servicio de user y customer
// static config(sequelize) {
//   return {
//     sequelize,
//     tableName: USER_TABLE,
//     modelName: 'User',
//     timestamps: false,
//     hooks: {
//       beforeCreate: async (user, options) => {
//         await hashPassword(user, options);
//       },
//       afterCreate: async (user, options) => {
//         delete user.dataValues.password;
//       },
//     },
//   };
// };