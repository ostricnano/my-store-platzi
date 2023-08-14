const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15).messages({
  'string.base': `Name should be a type of 'text'`,
  'string.empty': `Name cannot be an empty field`,
  'string.min': `Name should have a minimum length of {#limit}`,
  'string.max': `Name should have a maximum length of {#limit}`,
  'any.required': `Name is a required field`,
  });

const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name,
  price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };