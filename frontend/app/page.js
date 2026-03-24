'use client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateHabitStatus, fetchHabits } from '../store/habitSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items: habits, loading } = useSelector((state) => state.habits);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Redirigir al login si no hay token.
    if (!token) {
      router.push('/login');
    } else {
      // Cargar los hábitos específicos del usuario.
      dispatch(fetchHabits());
    }
  }, [dispatch, router]);

  const handleDone = (id) => {
    dispatch(updateHabitStatus(id));
  };

  if (loading) return <p className="text-center p-10">Cargando tus hábitos...</p>;

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mis Hábitos Atómicos
        </h1>

        <div className="space-y-6">
          {habits.length > 0 ? (
            habits.map((habit) => {
              const progress = Math.min((habit.daysCount / 66) * 100, 100);
              // Lógica visual basada en la racha de 66 días.
              const barColor = habit.daysCount >= 66 ? 'bg-green-500' : 
                               habit.daysCount >= 21 ? 'bg-yellow-500' : 'bg-red-500';

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
            <div className="text-center">
              <p className="text-gray-500 mb-4">No hay hábitos registrados aún.</p>
              <button 
                onClick={() => router.push('/dashboard/nuevo')} // Ajustar según ruta de creación.
                className="text-blue-600 hover:underline"
              >
                + Agregar mi primer hábito
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => { localStorage.removeItem('token'); router.push('/login'); }}
          className="mt-8 text-sm text-red-500 hover:text-red-700 block mx-auto"
        >
          Cerrar Sesión
        </button>
      </div>
    </main>
  );
}