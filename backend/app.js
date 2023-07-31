const express = require('express');
const app = express();

const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/Integradora';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión con MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa con MongoDB');
});

const userRoutes = require('./routes/users');

// ...

app.use('/api', userRoutes); // Utiliza las rutas definidas en users.js en /api

// ...
const PORT = 3003; // o el puerto que desees
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});


// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Resto del código del servidor
// ...
