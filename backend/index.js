const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Habit = require('./models/Habit');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();

app.use(cors({
    origin: ["https://proyecto-habitos-4zur.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    credentials: true
}));

app.options('*', cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error de conexión:', err));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', (req, res) => {
    res.send('API del Proyecto de Control de Hábitos funcionando correctamente');
});

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

app.get('/habitos', auth, async (req, res) => {
    try {
        const habitos = await Habit.find({ user: req.user.id });
        res.json(habitos);
    } catch (error) { res.status(500).json({ message: error.message }); }
});

app.post('/habitos', auth, async (req, res) => {
    try {
        const nuevoHabito = new Habit({ ...req.body, user: req.user.id });
        await nuevoHabito.save();
        res.status(201).json(nuevoHabito);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

app.patch('/habitos/:id/done', auth, async (req, res) => {
    try {
        const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
        if (!habit) return res.status(404).json({ message: "Hábito no encontrado" });

        const hoy = new Date();
        if (habit.lastCompleted) {
            const diff = (hoy - new Date(habit.lastCompleted)) / (1000 * 60 * 60 * 24);
            habit.count = diff > 1.5 ? 1 : habit.count + 1;
        } else {
            habit.count = 1;
        }

        habit.lastCompleted = hoy;
        await habit.save();
        res.json(habit);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

app.delete('/habitos/:id', auth, async (req, res) => {
    try {
        const resultado = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!resultado) return res.status(404).json({ message: "No autorizado o no existe" });
        res.json({ message: "Hábito eliminado" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;