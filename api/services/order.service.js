const boom = require('@hapi/boom');
const { models } = require('./../../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }
  //agregar item a la orden
  async addItem (data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
				{
					association: 'customer',
					include: ['user'],
				},
        'items'
			],
    })
    if (!order) {
      throw boom.notFound('order not found');
    }
    return order;
  }

  async update(id, changes){
    const order = await this.findOne(id);
    const result = await order.update(changes);
    return result;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { message: 'Order deleted' + ' ' + id };
  }
}

module.exports = OrderService;