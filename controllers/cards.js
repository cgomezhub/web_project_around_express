const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id; // _id se volverá accesible
  const { name, link } = req.body;

  if (!req.body) {
    return res.status(400).send({ message: 'Request body is required' });
  }

  if (!name || !link) {
    return res.status(400).send({ message: 'name and link are required' });
  }

  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        res.status(404).send({ message: 'Card ID not found' });
      }
    })
    .catch(() =>
      res.status(500).send({ message: 'An error has ocurred on the server' })
    );
};
