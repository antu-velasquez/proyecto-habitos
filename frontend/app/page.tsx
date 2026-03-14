'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../store/habitSlice";
import HabitCard from "./HabitCard";
import Image from "next/image";

export default function Home() {
  const dispatch = useDispatch();
  const { items: habits, loading } = useSelector((state) => state.habits);

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-12 py-20 px-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8 text-black dark:text-white text-center sm:text-left">
            Mis Hábitos Atómicos
          </h1>
          
          {loading ? (
            <p className="text-zinc-500 text-center sm:text-left">Cargando hábitos...</p>
          ) : (
            <div className="flex flex-col w-full">
              {habits.map((habit) => (
                <HabitCard key={habit._id} habit={habit} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}