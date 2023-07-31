const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  // Otros campos del usuario, si los tienes
});

// Crear el modelo "User" basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Exportar el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
