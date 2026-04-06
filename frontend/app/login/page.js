'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://proyecto-habitos-4zur.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('token', data.token);
        router.push('/'); 
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en el login:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg text-black">
        <h1 className="text-2xl mb-4 font-bold">Iniciar Sesión</h1>
        <input 
          type="text" 
          placeholder="Usuario" 
          className="border p-2 mb-2 w-full rounded"
          required
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="border p-2 mb-4 w-full rounded"
          required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
}