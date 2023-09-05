const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}

  // crear una orden de compra en donde el id del customer se lo pase dinamicacamente
  // extraido del sub del token, buscamos el usuario por id extrayendo el id del token
  // si el usuario no existe arrojamos un user not found
  // si el usuario existe creamos la orden de compra
  async create(data) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    })
    if (!customer) {
      throw boom.badRequest('Customer not found');
    }
    console.log('customer',customer)
    const newOrder = await models.Order.create({
      customerId: customer.id,
    });
    return newOrder;
  }
  //agregar item a la orden
  async addItem (data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
  //encuntra ordenes de compra por usuario
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
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