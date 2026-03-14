'use client';
import { useDispatch } from 'react-redux';
import { completeDay } from '../store/habitSlice';

export default function HabitCard({ habit }) {
  const dispatch = useDispatch();

  return (
    <div className="w-full p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {habit.name}
        </h3>
        <span className="text-sm font-medium text-zinc-500">
          {habit.daysCount} / 66 días
        </span>
      </div>

      {/* Barra de progreso. */}
      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
        {/* Barra dinámica. */}
        <div 
          className={`h-full transition-all duration-700 ease-in-out ${habit.statusColor}`}
          style={{ width: `${habit.progress}%` }}
        ></div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="text-xs text-zinc-400">
          {habit.daysCount < 21 ? 'Iniciando (Rojo)' : habit.daysCount < 66 ? 'En camino (Amarillo)' : '¡Logrado! (Verde)'}
        </p>
        <button
          onClick={() => dispatch(completeDay(habit._id))}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-md transition-colors"
        >
          Marcar día
        </button>
      </div>
    </div>
  );
}