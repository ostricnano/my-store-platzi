const express = require('express');
const validateHandler = require('../middlewares/validator.handler');
const UserService = require('../services/user.service');
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
  async (req, res) => {
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
  async (req, res) => {
    const user = req.body;
    const newUser = await service.create(user);
    res.status(201).json(newUser);
  }
);

router.patch('/:id',
  validateHandler(getUserSchema, 'params'),
  validateHandler(updateUserSchema, 'body'),
  async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await service.delete(id);
  res.status(204).json();
});


module.exports = router;
