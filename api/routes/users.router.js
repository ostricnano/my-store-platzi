const express = require('express');

const UserService = require('../services/user.service');
const validateHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UserService();

router.get('/', async (req, res) => {
    const users =  await service.find();
    res.json(users);
  }
);

router.get('/:id',
  validateHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add',
  validateHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.body;
      const newUser = await service.create(user);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validateHandler(getUserSchema, 'params'),
  validateHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.body;
      const updatedUser = await service.update(id, user);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete/:id',
  validateHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
