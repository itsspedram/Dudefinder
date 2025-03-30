'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/matches', label: 'Matches' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-pink-600">Dudefinder</h1>
      <div className="flex gap-4">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium ${pathname === href ? 'text-pink-600' : 'text-gray-600'} hover:text-pink-600`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}