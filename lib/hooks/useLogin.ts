import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setIsLoading(false);
    if (!res?.error) router.push('/dashboard');
    return res;
  };

  return { login, isLoading };
}