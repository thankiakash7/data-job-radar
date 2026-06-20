import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="cursor-pointer text-lg font-bold text-gray-900">
              Data Job Radar
            </span>
          </Link>

          <nav className="flex gap-6 text-sm font-medium sm:gap-8">
            <Link href="/">
              <span
                className={`cursor-pointer transition ${
                  isActive('/') ? 'text-gray-900 underline' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Search
              </span>
            </Link>
            <Link href="/about">
              <span
                className={`cursor-pointer transition ${
                  isActive('/about')
                    ? 'text-gray-900 underline'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                About
              </span>
            </Link>
            <Link href="/profile">
              <span
                className={`cursor-pointer transition ${
                  isActive('/profile')
                    ? 'text-gray-900 underline'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Profile
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
