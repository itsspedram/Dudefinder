'use client';
import Spinner from '@/components/Spinner';
import { cn } from '@/lib/utils'
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({ loading, variant = 'primary', className, children, ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded font-medium transition flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-pink-500 text-white hover:bg-pink-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(base, variants[variant], className, loading && 'opacity-70 cursor-not-allowed')}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}