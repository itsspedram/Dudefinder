

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (form: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setIsLoading(false);
    if (res.ok) router.push('/login');
  };

  return { register, isLoading };
}

