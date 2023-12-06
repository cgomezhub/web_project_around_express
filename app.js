const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

const userRoutes = require('./routes/users');

const cardRoutes = require('./routes/cards');

app.use(userRoutes);
app.use(cardRoutes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
