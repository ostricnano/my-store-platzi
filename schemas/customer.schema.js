const join = require('joi');
const { createUserSchema, updateUserSchema } = require('./user.schema');

const id = join.number().integer();
const name = join.string().min(3).max(30);
const lastName = join.string().min(3).max(30);
const phone = join.string();
const userId = join.number().integer();

const getCustomerSchema = join.object({
  id: id.required(),
});

const createCustomerSchema = join.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema.required(),
});

const updateCustomerSchema = join.object({
  name,
  lastName,
  phone,
  userId,
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema }