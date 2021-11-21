const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use('/', require('./route/routeControl'));
app.use(function (error, req, res, next) {
  if (error.message === 'O aparelho já existe') {
    return res.status(409).send(error.message);
  } 
  res.status(500).send(error.message);
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.')
});