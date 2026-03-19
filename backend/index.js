const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Habit = require('./models/Habit');

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch((err) => console.error('Error de conexión:', err));

// Endpoints.

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

// Arrancar el servidor.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});