const express = require('express');
const CategoryService = require('./../services/category.service');
const validateHandler = require('../middlewares/validator.handler')
const { checkRoles } = require('../middlewares/auth.handler')
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('./../schemas/category.schema');

const passport = require('passport');
const router = express.Router();
const service = new CategoryService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'client'),
  async (req, res) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller', 'client'),
  validateHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validateHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validateHandler(getCategorySchema, 'params'),
  validateHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  }
);

module.exports = router;