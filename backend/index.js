const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Para HASH de contraseñas.
require('dotenv').config();

const Habit = require('./models/Habit');
const User = require('./models/User'); 

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión:', err));

// --- Registro con HASH. ---
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Generar HASH para guardar contraseña.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({ username, password: hashedPassword });
        await nuevoUsuario.save();
        res.status(201).json({ message: "Usuario registrado" });
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// --- Lógica de racha. ---
app.patch('/habitos/:id/done', async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        const hoy = new Date();
        
        if (habit.lastCompleted) {
            const diff = (hoy - habit.lastCompleted) / (1000 * 60 * 60 * 24);
            // Si pasó más de 1 día y medio, se reinicia la racha.
            habit.daysCount = diff > 1.5 ? 1 : habit.daysCount + 1;
        } else {
            habit.daysCount = 1;
        }

        habit.lastCompleted = hoy;
        await habit.save();
        res.json(habit);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

// --- Otros Endpoints. ---
app.post('/habitos', async (req, res) => {
    try {
        const nuevoHabito = new Habit(req.body);
        await nuevoHabito.save();
        res.status(201).json(nuevoHabito);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

app.delete('/habitos/:id', async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Hábito eliminado" });
    } catch (error) { res.status(500).json({ message: error.message }); }
});

app.put('/habitos/:id', async (req, res) => {
    try {
        const habitoActualizado = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(habitoActualizado);
    } catch (error) { res.status(400).json({ message: error.message }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});