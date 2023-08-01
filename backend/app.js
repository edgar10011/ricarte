const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../backend/routes/users');

const mongoose = require('mongoose');

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'src')));

const MONGODB_URI = 'mongodb://localhost:27017/Integradora';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Conexión exitosa a ${MONGODB_URI}`);
    const PORT = 3004; 
    app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.message);
  });

  app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
  
    newUser.save()
      .then(() => {
        res.status(200).send('Registro exitoso');
      })
      .catch((error) => {
        res.status(500).send('Error en el registro');
      });
  });
  


  app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
  
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          res.status(500).send('El usuario no existe');
        } else {
          user.isCorrectPassword(password)
            .then((result) => {
              if (result) {
                res.status(200).send('Usuario autenticado correctamente');
              } else {
                res.status(500).send('Usuario y/o contraseña incorrecta');
              }
            })
            .catch((error) => {
              res.status(500).send('Error al autenticar');
            });
        }
      })
      .catch((error) => {
        res.status(500).send('Error al autenticar al usuario');
      });
  });

app.get('/user', (req, res) => {
    // Aquí puedes realizar la lógica para obtener la lista de usuarios de tu base de datos o de donde corresponda
    // Por ejemplo, supongamos que estás usando el modelo 'User' definido en tu archivo users.js:
  
    User.find({})
      .then(users => {
        res.status(200).json(users); // Devolver la lista de usuarios en formato JSON
      })
      .catch(error => {
        res.status(500).send('Error al obtener la lista de usuarios');
      });
  });
  
  
  
