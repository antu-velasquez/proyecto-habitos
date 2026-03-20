'use client';
import { useSelector, useDispatch } from 'react-redux';
import { updateHabitStatus } from '../store/habitSlice'; // Asegúrate de tener esta acción creada

export default function HomePage() {
  const dispatch = useDispatch();
  const { items: habits } = useSelector((state) => state.habits);

  const handleDone = (id) => {
    // Enviar el PATCH al backend.
    dispatch(updateHabitStatus(id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mis Hábitos Atómicos
        </h1>

        <div className="space-y-6">
          {habits.length > 0 ? (
            habits.map((habit) => {
              // Lógica de progreso.
              const progress = Math.min((habit.daysCount / 66) * 100, 100);
              // Lógica de color.
              const barColor = habit.daysCount >= 66 ? 'bg-green-500' : 'bg-red-500';

              return (
                <div key={habit._id || habit.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-700">
                      {habit.name} <span className="text-sm font-normal text-gray-500">({habit.daysCount} días)</span>
                    </h2>
                    
                    <button 
                      onClick={() => handleDone(habit._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition-colors"
                    >
                      Done
                    </button>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">Progreso hacia los 66 días:</p>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`${barColor} h-4 rounded-full transition-all duration-500`} 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No hay hábitos registrados aún.</p>
          )}
        </div>
      </div>
    </main>
  );
}