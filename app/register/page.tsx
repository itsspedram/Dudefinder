'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/Button';
import { useRegisterForm } from '@/lib/hooks/useRegister';

export default function RegisterPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { form,isLoading , onSubmit,handleChange } = useRegisterForm();

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={e => onSubmit(e)} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          onChange={handleChange('name')} value={form.name}        />
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={handleChange('email')}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange('password')}
        />
        <Button
          loading={isLoading}
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
