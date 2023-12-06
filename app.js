const express = require('express');

const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

const UserRoutes = require('./routes/users');

const CardRoutes = require('./routes/cards');

app.use(UserRoutes);
app.use(CardRoutes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

