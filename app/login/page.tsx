'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (!res?.error) router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Login</button>
      </form>
    </div>
  );
}
