// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const cors = require('cors');

// const app = express();
// const port = 3007;

// // Conectar a la base de datos MongoDB
// mongoose.connect('mongodb://localhost:27017/Integradora', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const User = mongoose.model('User', {
//   username: String,
//   password: String,
// });

// const PlantitaSchema = new mongoose.Schema({
//   imagen: String,
//   titulo: String,
//   humedad: Number,
// });

// const PlantitaModel = mongoose.model('Plantita', PlantitaSchema);

// app.use(bodyParser.json());
// app.use(cors());

// // Método para verificar las credenciales y autenticar al usuario
// async function authenticateUser(username, password) {
//   const user = await User.findOne({ username });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     return true;
//   }

//   return false;
// }

// // Ruta para el registro de usuarios
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     username,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     res.status(200).json({ success: true, message: 'Registro exitoso' });
//   } catch (error) {
//     res.status(500).send('Error en el registro');
//   }
// });

// // Ruta para el inicio de sesión
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const isAuthenticated = await authenticateUser(username, password);

//     if (isAuthenticated) {
//       res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
//     } else {
//       res.status(401).json({ success: false, message: 'Usuario y/o contraseña incorrecta' });
//     }
//   } catch (error) {
//     res.status(500).send('Error en el inicio de sesión');
//   }
// });

// // Ruta para obtener las plantas
// app.get('/obtenerPlantas', async (req, res) => {
//   try {
//     const plantas = await PlantitaModel.find({});
//     res.status(200).json({ success: true, data: plantas });
//   } catch (error) {
//     res.status(500).send({ success: false, message: 'Error al obtener plantas' });
//   }
// });

// // Ruta para agregar una nueva planta
// app.post('/Integradora/plantitas', async (req, res) => {
//   const { imagen, titulo, humedad } = req.body;

//   try {
//     const nuevaPlanta = new PlantitaModel({
//       imagen,
//       titulo,
//       humedad,
//     });

//     await nuevaPlanta.save();
//     res.status(200).json({ success: true, message: 'Planta agregada exitosamente' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error al agregar planta' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor en ejecución en http://localhost:${port}`);
// });


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
app.get('/Integradora/plantitas', async (req, res) => {
  try {
    const plantitas = await PlantitaModel.find();
    res.json(plantitas);
  } catch (error) {
    console.error('Error al obtener plantitas:', error);
    res.status(500).json({ error: 'Error al obtener plantitas' });
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
// Ruta para actualizar los datos de una planta
app.put('/Integradora/plantitas/:id', async (req, res) => {
  const plantId = req.params.id;
  const { imagen, titulo } = req.body;

  try {
    // Utiliza la función findByIdAndUpdate para actualizar el documento por su _id
    await PlantitaModel.findByIdAndUpdate(plantId, {
      imagen,
      titulo,
    });

    res.status(200).json({ success: true, message: 'Planta actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar planta:', error);
    res.status(500).json({ success: false, message: 'Error al actualizar planta' });
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
