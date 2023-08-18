const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const OrdersRouter = require('./orders.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/orders', OrdersRouter);
    router.use('/customers', customersRouter);
}

module.exports = routerApi;
