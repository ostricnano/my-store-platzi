const Joi = require('joi');

const id = Joi.number().integer()
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amout = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
	id: id,
})

const createOrderSchema = Joi.object({
	customerId: customerId.required(),
});

const addItemSchemna = Joi.object({
	orderId: orderId.required(),
  productId: productId.required(),
  amout: amout.required(),
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchemna }