'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-4xl font-bold">💘 Welcome to Dudefinder</h1>
      <p className="text-lg text-gray-600">Find your vibe, not just a match.</p>

      {session?.user ? (
        <div className="mt-6 text-center">
          <p className="text-xl">Hi, <span className="font-semibold">{session.user.name || session.user.email}</span> 👋</p>
          <p className="text-sm text-gray-500 mt-1">You&#39;re logged in and ready to find a match.</p>
          <div className="flex gap-4 mt-4 justify-center">
            <Link href="/explore" className="px-6 py-2 bg-blue-500 text-white rounded-2xl shadow">Start Swiping</Link>
            <Link href="/matches" className="px-6 py-2 bg-green-500 text-white rounded-2xl shadow">View Matches</Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 mt-6">
          <Link href="/register" className="px-6 py-2 bg-pink-500 text-white rounded-2xl shadow">Sign Up</Link>
          <Link href="/login" className="px-6 py-2 bg-gray-200 text-gray-800 rounded-2xl shadow">Log In</Link>
        </div>
      )}
    </main>
  );
}