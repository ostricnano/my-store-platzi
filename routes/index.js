const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/orders', ordersRouter);
    router.use('/customers', customersRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
}

module.exports = routerApi;
