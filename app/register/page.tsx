'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      setIsLoading(false);
      return res;
    });
    if (res.ok) router.push('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Name" onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input className="w-full p-2 border rounded" placeholder="Email" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        <Button loading={isLoading} type="submit" className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600">Register</Button>
      </form>
    </div>
  );
}