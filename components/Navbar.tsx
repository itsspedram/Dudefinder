'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const navItems = [
    { href: '/', label: 'Home' },
    ...(isLoggedIn
      ? [
          { href: '/explore', label: 'Explore' },
          { href: '/matches', label: 'Matches' },
          { href: '/profile', label: 'Profile' },
        ]
      : []),
  ];

  return (
    <nav className="bg-white shadow-sm py-3 px-4 sm:px-6 flex flex-wrap items-center justify-between">
      <h1 className="text-xl font-bold text-pink-600">Dudefinder</h1>
      <div className="flex flex-wrap items-center gap-3 mt-2 sm:mt-0">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${
              pathname === href ? 'text-pink-600' : 'text-gray-600'
            } hover:text-pink-600`}
          >
            {label}
          </Link>
        ))}
        {isLoggedIn && (
          <button
            onClick={() => signOut()}
            className="text-sm text-white bg-pink-500 px-3 py-1 rounded hover:bg-pink-600 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
