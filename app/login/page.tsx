'use client';
import { useSession, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setIsLoading(false);
    if (!res?.error) router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        <Button loading={isLoading} type="submit">Login</Button>
      </form>
    </div>
  );
}
