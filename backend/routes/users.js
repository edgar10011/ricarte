const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Ruta para obtener todos los usuarios
router.get('/users', (req, res) => {
  // Realizar una consulta a la base de datos para obtener todos los usuarios
  User.find({})
    .then((users) => {
      // Enviar la lista de usuarios como respuesta en formato JSON
      res.json(users);
    })
    .catch((err) => {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    });
});

// Ruta para crear un nuevo usuario
router.post('/users', (req, res) => {
  // Obtener los datos enviados en el cuerpo de la solicitud
  const { name, email, age } = req.body;

  // Crear un nuevo documento de usuario utilizando el modelo User
  const newUser = new User({ name, email, age });

  // Guardar el nuevo usuario en la base de datos
  newUser
    .save()
    .then((user) => {
      // Enviar el usuario recién creado como respuesta en formato JSON
      res.json(user);
    })
    .catch((err) => {
      console.error('Error al crear un nuevo usuario:', err);
      res.status(500).json({ error: 'Error al crear un nuevo usuario' });
    });
});

// Otras rutas y métodos aquí...

module.exports = router;
