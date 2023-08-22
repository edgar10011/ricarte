const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

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

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, '3556', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user; // Asigna el usuario autenticado al objeto req
    next();
  });
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
      const token = jwt.sign({ username }, '3556', { expiresIn: '1h' });
      res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ success: false, message: 'Usuario y/o contraseña incorrecta' });
    }
  } catch (error) {
    res.status(500).send('Error en el inicio de sesión');
  }
});

// Ruta para obtener las plantas
app.get('/Integradora/plantitas', authenticateToken, async (req, res) => {
  try {
    const plantitas = await PlantitaModel.find();
    res.json(plantitas);
  } catch (error) {
    console.error('Error al obtener plantitas:', error);
    res.status(500).json({ error: 'Error al obtener plantitas' });
  }
});

// Ruta para agregar una nueva planta
app.post('/Integradora/plantitas', authenticateToken, async (req, res) => {
  const authenticatedUser = req.user; // Obtén el usuario autenticado desde el middleware
  const { imagen, titulo, humedad } = req.body;

  try {
    const nuevaPlanta = new PlantitaModel({
      imagen,
      titulo,
      humedad,
      usuario: authenticatedUser._id // Asigna el usuario autenticado como propietario de la planta
    });

    await nuevaPlanta.save();
    res.status(200).json({ success: true, message: 'Planta agregada exitosamente' });
  } catch (error) {
    console.error('Error al agregar planta:', error);
    res.status(500).json({ success: false, message: 'Error al agregar planta' });
  }
});


// Ruta para actualizar la humedad de una planta existente
app.patch('/Integradora/plantitas/:id', async (req, res) => {
  const plantId = req.params.id;
  const { humedad } = req.body;

  try {
    await PlantitaModel.findByIdAndUpdate(plantId, { humedad });
    res.status(200).json({ success: true, message: 'Humedad de planta actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar humedad de planta:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar humedad de planta' });
  }
});

// Ruta para actualizar los datos de una planta
app.put('/Integradora/plantitas/titulo/:titulo', async (req, res) => {
  const titulo = req.params.titulo;
  const nuevaInfo = req.body; // Suponiendo que envías la nueva información en el cuerpo de la solicitud

  try {
    const result = await PlantitaModel.findOneAndUpdate({ titulo: titulo }, nuevaInfo, { new: true });
    if (result) {
      res.status(200).json({ success: true, message: 'Planta editada exitosamente', planta: result });
    } else {
      res.status(404).json({ success: false, message: 'Planta no encontrada' });
    }
  } catch (error) {
    console.error('Error al editar planta:', error);
    res.status(500).json({ success: false, message: 'Error al editar planta' });
  }
});


app.delete('/Integradora/plantitas/titulo/:titulo', async (req, res) => {
  const titulo = req.params.titulo;

  try {
    const result = await PlantitaModel.findOneAndDelete({ titulo: titulo });
    if (result) {
      res.status(200).json({ success: true, message: 'Planta eliminada exitosamente' });
    } else {
      res.status(404).json({ success: false, message: 'Planta no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar planta:', error);
    res.status(500).json({ success: false, message: 'Error al eliminar planta' });
  }
});






app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
