const express = require('express');

const validateHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchemna } = require('./../schemas/order.schema');
const OrderService = require('./../services/order.service');
const passport = require('passport');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validateHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      // capturamos customer id del token
      // la orden se crea dinamicamente sin tener que pasarselo por parametro
      const body = {
        userId: req.user.sub,
      };
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

// router de product-order
// agregamos items a la orden de compra con id y cantidad
router.post('/add-item',
  validateHandler(addItemSchemna, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;