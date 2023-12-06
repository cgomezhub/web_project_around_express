const { Router } = require('express');

const router = Router();

const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  fs.readFile(path.join('data', 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error has ocurred on the server');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile(path.join('data', 'users.json'), 'utf8', (err, data) => {    if (err) {
    console.error(err);
    res.status(500).send('An error has ocurred on the server');
  } else {
    const users = JSON.parse(data);
    const user = users.find(u => u._id === userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  }
  });
});

module.exports = router;