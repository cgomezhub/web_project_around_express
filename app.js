const express = require('express');

const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

//app.use(express.json()); // Para poder parsear el cuerpo de las solicitudes POST



app.use(express.static(path.join(__dirname, 'data')));



const fs = require('fs');

app.get('/cards', (req, res) => {
  fs.readFile('./data/cards.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Hubo un error al leer el archivo');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get('/users', (req, res) => {
  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Hubo un error al leer el archivo');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Hubo un error al leer el archivo');
    } else {
      const users = JSON.parse(data);
      console.log(users);
      const user = users.find(u => u._id === userId);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'ID de usuario no encontrado' });
      }
    }
  });
});


app.use('*', (req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

