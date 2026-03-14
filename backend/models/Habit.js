const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 }, // Días acumulados (21-66).
  lastCompleted: { type: Date, default: null } // Para reiniciar si falta un día.
});

module.exports = mongoose.model('Habit', habitSchema);