import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function useRegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      setIsLoading(false);
      return false;
    }

    // Auto sign-in after successful register
    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setIsLoading(false);
    return result?.ok;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) router.push('/profile');
  };

  return {
    form,
    setForm,
    handleChange,
    isLoading,
    handleSubmit,
    onSubmit
  };
}
