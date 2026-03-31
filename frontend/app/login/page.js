'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('https://proyecto-habitos-one.vercel.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token); // Guardar JWT para enviarlo posteriormente.
      router.push('/'); // Volver al panel.
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
        <input 
          type="text" 
          placeholder="Usuario" 
          className="border p-2 mb-2 w-full"
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          className="border p-2 mb-4 w-full"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button className="bg-blue-500 text-white p-2 w-full rounded">Entrar</button>
      </form>
    </div>
  );
}