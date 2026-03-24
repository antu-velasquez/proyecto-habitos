import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Obtener solo los hábitos del usuario identificado.
export const fetchHabits = createAsyncThunk('habits/fetchHabits', async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/habitos', {
    headers: { 'x-auth-token': token } // Enviar el JWT para identificación.
  });
  if (!response.ok) throw new Error('Error al obtener los hábitos');
  return await response.json();
});

// Registrar un día completado en el servidor.
export const updateHabitStatus = createAsyncThunk('habits/updateHabitStatus', async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5000/habitos/${id}/done`, {
    method: 'PATCH',
    headers: { 'x-auth-token': token }
  });
  if (!response.ok) throw new Error('Error al actualizar la racha');
  return await response.json();
});

// Acción para agregar un nuevo hábito.
export const addHabit = createAsyncThunk('habits/addHabit', async (newHabit) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/habitos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    },
    body: JSON.stringify(newHabit),
  });
  if (!response.ok) throw new Error('No se pudo guardar el hábito');
  return await response.json();
});

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {}, // Las acciones se manejan en extraReducers por ser asíncronas.
  extraReducers: (builder) => {
    builder
      // Carga inicial de hábitos.
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map(habit => ({
          ...habit,
          progress: (habit.daysCount / 66) * 100,
          statusColor: habit.daysCount >= 66 ? 'bg-green-500' : 
                       habit.daysCount >= 21 ? 'bg-yellow-500' : 'bg-red-500'
        }));
      })
      // Actualizar racha tras el clic en Done.
      .addCase(updateHabitStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          const updatedHabit = action.payload;
          state.items[index] = {
            ...updatedHabit,
            progress: (updatedHabit.daysCount / 66) * 100,
            statusColor: updatedHabit.daysCount >= 66 ? 'bg-green-500' : 
                         updatedHabit.daysCount >= 21 ? 'bg-yellow-500' : 'bg-red-500'
          };
        }
      })
      // Agregar nuevo hábito a la lista visual.
      .addCase(addHabit.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default habitSlice.reducer;