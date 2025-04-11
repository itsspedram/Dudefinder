'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useLoginForm } from '@/lib/hooks/useLogin';

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const { handleChange, handleSubmit,isLoading,form } = useLoginForm();


  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" onChange={handleChange('email')} value={form.email}
 />
        <input className="w-full p-2 border rounded" type="password" placeholder="Password" onChange={handleChange('password')} value={form.password}
 />
        <Button loading={isLoading} type="submit">Login</Button>
      </form>
    </div>
  );
}
