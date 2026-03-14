import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Obtener hábitos del backend.
export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  const response = await fetch('http://localhost:5000/habitos'); // Puerto en que corre el backend.
  if (!response.ok) throw new Error('Error al obtener los hábitos');
  return await response.json();
});

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    // Verificar los 66 días y marcar como completado.
    completeDay: (state, action) => {
      const habit = state.items.find(h => h._id === action.payload);
      if (habit) {
        // Reiniciar conteo si pasan más de 24h sin marcar.
        habit.daysCount += 1;
        
        // Cálculo del progreso para la barra.
        habit.progress = Math.min((habit.daysCount / 66) * 100, 100);
        
        // Color de la barra.
        if (habit.daysCount < 21) {
          habit.statusColor = 'bg-red-500'; // Rojo al inicio.
        } else if (habit.daysCount < 66) {
          habit.statusColor = 'bg-yellow-500'; // Transición.
        } else {
          habit.statusColor = 'bg-green-500'; // Verde al llegar a la meta.
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        // Calcular el color inicial para cada hábito.
        state.items = action.payload.map(habit => ({
          ...habit,
          progress: (habit.daysCount / 66) * 100,
          statusColor: habit.daysCount >= 66 ? 'bg-green-500' : 
                       habit.daysCount >= 21 ? 'bg-yellow-500' : 'bg-red-500'
        }));
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { completeDay } = habitSlice.actions;
export default habitSlice.reducer;