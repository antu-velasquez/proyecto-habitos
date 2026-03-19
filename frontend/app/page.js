'use client';
import { useSelector } from 'react-redux';

export default function HomePage() {
  // Lista dinámica según Redux.
  const { items: habits } = useSelector((state) => state.habits);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Mis Hábitos Atómicos
        </h1>

        <div className="space-y-6">
          {habits.length > 0 ? (
            habits.map((habit) => (
              <div key={habit._id || habit.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-gray-700">{habit.name}</h2>
                  
                  {/* Botón Done.  */}
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg transition-colors">
                    Done
                  </button>
                </div>

                {/* Barra de progreso. */}
                <p className="text-sm text-gray-500 mb-1">Progreso hacia los 66 días:</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-red-500 h-4 rounded-full transition-all duration-500" 
                    style={{ width: '30%' }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No hay hábitos registrados aún.</p>
          )}
        </div>
      </div>
    </main>
  );
}