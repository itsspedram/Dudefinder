'use client';

import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-6xl font-bold text-pink-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
