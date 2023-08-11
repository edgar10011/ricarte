const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3007;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Integradora', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  password: String,
});

const PlantitaSchema = new mongoose.Schema({
  imagen: String,
  titulo: String,
  humedad: Number,
});

const PlantitaModel = mongoose.model('Plantita', PlantitaSchema);

app.use(bodyParser.json());
app.use(cors());

// Método para verificar las credenciales y autenticar al usuario
async function authenticateUser(username, password) {
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }

  return false;
}

// Ruta para el registro de usuarios
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json({ success: true, message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).send('Error en el registro');
  }
});

// Ruta para el inicio de sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const isAuthenticated = await authenticateUser(username, password);

    if (isAuthenticated) {
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Usuario y/o contraseña incorrecta' });
    }
  } catch (error) {
    res.status(500).send('Error en el inicio de sesión');
  }
});

// Ruta para obtener las plantas
app.get('/obtenerPlantas', async (req, res) => {
  try {
    const plantas = await PlantitaModel.find({});
    res.status(200).json({ success: true, data: plantas });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error al obtener plantas' });
  }
});

// Ruta para agregar una nueva planta
app.post('/Integradora/plantitas', async (req, res) => {
  const { imagen, titulo, humedad } = req.body;

  try {
    const nuevaPlanta = new PlantitaModel({
      imagen,
      titulo,
      humedad,
    });

    await nuevaPlanta.save();
    res.status(200).json({ success: true, message: 'Planta agregada exitosamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al agregar planta' });
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
