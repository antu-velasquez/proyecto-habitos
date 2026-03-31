const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 
require('dotenv').config();

const Habit = require('./models/Habit');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();

// Configuración de CORS.
app.use(cors({
  origin: 'https://proyecto-habitos-4zur.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], 
  credentials: true
}));

app.use(express.json());

// Conexión a la base de datos.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión:', err));

// Registro de nuevos usuarios.
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({ username, password: hashedPassword });
        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario registrado" });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// Login con entrega de token JWT.
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await User.findOne({ username });
        if (!usuario) return res.status(400).json({ message: "Usuario no encontrado" });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(400).json({ message: "Contraseña incorrecta" });

        const payload = { user: { id: usuario.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// Obtener hábitos del usuario.
app.get('/habitos', auth, async (req, res) => {
    try {
        const habitos = await Habit.find({ user: req.user.id });
        res.json(habitos);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

// Crear hábito.
app.post('/habitos', auth, async (req, res) => {
    try {
        const nuevoHabito = new Habit({ ...req.body, user: req.user.id });
        await nuevoHabito.save();
        res.status(201).json(nuevoHabito);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// Actualizar racha.
app.patch('/habitos/:id/done', auth, async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
        if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

        const hoy = new Date();
        if (habit.lastCompleted) {
            const diff = (hoy - habit.lastCompleted) / (1000 * 60 * 60 * 24);
            habit.daysCount = diff > 1.5 ? 1 : habit.daysCount + 1;
        } else {
            habit.daysCount = 1;
        }

        habit.lastCompleted = hoy;
        await habit.save();
        res.json(habit);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// Eliminar hábito.
app.delete('/habitos/:id', auth, async (req, res) => {
    try {
        const resultado = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!resultado) return res.status(404).json({ message: "No autorizado o no existe" });
        res.json({ message: "Hábito eliminado" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});