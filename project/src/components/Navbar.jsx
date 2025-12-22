'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { Sun, Moon, LogOut, LayoutDashboard, BarChart3, Home, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 transition-colors">
      <ul className="flex flex-col sm:flex-row justify-between items-center w-full max-w-7xl mx-auto p-3 sm:p-5 gap-3 sm:gap-0">
        
        <li className="text-black dark:text-white font-bold text-lg sm:text-xl">
          <Link href={user ? "/dashboard" : "/"}>TaskManager Pro</Link>
        </li>

        <li className="flex flex-wrap gap-3 sm:gap-6 items-center justify-center">
          {user ? (
            <>
              <Link href="/dashboard" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-300 transition text-sm sm:text-base">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link href="/analytics" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-300 transition text-sm sm:text-base">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <span className="text-gray-700 dark:text-gray-400 text-xs sm:text-sm hidden sm:inline">
                {user.displayName || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-300 transition">
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link href="/auth/login" className="flex items-center gap-1 text-gray-700 dark:text-white hover:text-black dark:hover:text-gray-300 transition">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link href="/auth/signup" className="flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 py-2 rounded-lg transition">
                <UserPlus className="w-4 h-4" />
                Sign up
              </Link>
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
