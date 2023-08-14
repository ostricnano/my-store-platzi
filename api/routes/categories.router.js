const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    categories.push({
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      image: faker.image.url(),
    });
  }
  res.json(categories);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params.id;
  res.json({
    id,
    name: 'Category 1',
  });
});

module.exports = router;