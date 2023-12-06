const {Router} = require('express');
const fs = require('fs');
const router = Router();
const path = require('path');


router.get('/cards', (req, res) => {
  fs.readFile(path.join('data', 'cards.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Hubo un error al leer el archivo');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

module.exports = router;