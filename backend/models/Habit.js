const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  // Registro y login.
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Seguimiento de días.
  count: { 
    type: Number, 
    default: 0 
  }, 
  // Lógica de reinicio.
  lastCompleted: { 
    type: Date, 
    default: null 
  },
  // Fecha de creación del hábito.
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Habit', habitSchema);