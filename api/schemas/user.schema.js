const Joi = require('joi');

const id = Joi.string().uuid();
const first_name = Joi.string().min(3).max(30).messages({
  'string.base': `Name should be a type of 'text'`,
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
  'any.required': `Name is a required field`,
  });
const last_name = Joi.string().min(3).max(30).messages({
  'string.base': `Name should be a type of 'text'`,
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
  'any.required': `Name is a required field`,
  });
const avatar = Joi.string().uri();
const email = Joi.string().email().messages({
  'string.base': `Email should be a type of 'text'`,
  'string.empty': `Email cannot be an empty field`,
  'string.email': `Email format is invalid`,
  'any.required': `Email is a required field`,
  });
  const passwordSchema = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  .required();

  const password_confirmation = Joi.string().valid(Joi.ref('password')).required();

  const createUserSchema = Joi.object({
    first_name: first_name.required(),
    last_name: last_name.required(),
    email: email.required(),
    password: passwordSchema.required(),
    password_confirmation: password_confirmation.required(),
  });

  const updateUserSchema = Joi.object({
    first_name,
    last_name,
    avatar,
    email,
    password: passwordSchema,
    password_confirmation,
  });

  const getUserSchema = Joi.object({
    id: id.required(),
  });

  module.exports = { createUserSchema, updateUserSchema, getUserSchema };

