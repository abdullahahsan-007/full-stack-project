'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Loader2, KanbanSquare, Target, Search, BarChart2, Repeat, Clock, Moon, Tag, Lock } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            TaskManager
          </h1>
        
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 px-4">
            Organize, track, and complete your tasks with advanced features
          </p>
             <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 px-4">
          Complete your tasks with powerful features.
          </p>

             <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 px-4">
          You can add, edit, delete, and manage tasks efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
      
            <Link 
              href="/auth/login"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition border border-gray-700"
            >
              Login to continue
            </Link>
          </div>
        </div>

    </div>
    </div>
  );
}
