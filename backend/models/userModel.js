const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // Otros campos del usuario, si los tienes
  });

// Crear el modelo "User" basado en el esquema definido
const User = mongoose.model('User', userSchema);

// Exportar el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = User;
