const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(404).send({ message: 'User ID not found' });
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};
