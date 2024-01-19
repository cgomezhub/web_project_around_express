const express = require('express');

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/aroundb', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const IP = '34.16.169.189';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '657f509c04765e4d0e310eab',
  };

  next();
});

const userRoutes = require('./routes/users');

const cardRoutes = require('./routes/cards');

app.use(userRoutes);
app.use(cardRoutes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, IP, () => {
  console.log(`Server is running at http://${IP}:${PORT}`);
});
