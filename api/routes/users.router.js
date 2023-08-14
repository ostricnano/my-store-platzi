const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      image: faker.image.url(),
    });
  }
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params.id;
  res.json({
    id,
    name: 'User 1',
    lastName: 'User 1',
    email: ' User 1',
  });
});

module.exports = router;
