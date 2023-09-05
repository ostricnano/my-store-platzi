//const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
//traigo los operadores de sequelize
const { Op } = require('sequelize');

class ProductService {
  constructor() {}

  async create(data) {
   const newProduct = await models.Product.create(data);
   return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit =  limit;
      options.offset =  offset;
    }
    const { price } = query;
    if (price) {
      options.where.price = price;
    }
    const { price_min, price_max } = query;
    if (price_max && price_min) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const result = await product.update(changes);
    return result;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { message: 'Product deleted' + ' ' + id };
  }
}

module.exports = ProductService;