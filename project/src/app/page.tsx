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
            TaskManager Pro
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-6 sm:mb-8">
            Your Ultimate Productivity Companion
          </p>
          <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12 px-4">
            Organize, track, and complete your tasks with powerful features including Kanban boards, 
            analytics, categories, recurring tasks, and more!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link 
              href="/auth/signup"
              className="w-full sm:w-auto bg-white hover:bg-gray-200 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link 
              href="/auth/login"
              className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition border border-gray-700"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-white transition">
            <KanbanSquare className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Kanban Board</h3>
            <p className="text-gray-400">Visualize your workflow with customizable columns: To Do, In Progress, Pending, and Done</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Target className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Priority & Categories</h3>
            <p className="text-gray-400">Organize tasks by priority levels and custom categories for better focus</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Search className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Advanced Search</h3>
            <p className="text-gray-400">Find tasks instantly with powerful search and filtering capabilities</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <BarChart2 className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400">Track your productivity with detailed insights and completion rates</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Repeat className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Recurring Tasks</h3>
            <p className="text-gray-400">Set up daily, weekly, or monthly recurring tasks automatically</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Clock className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Task History</h3>
            <p className="text-gray-400">Track all changes and updates with complete audit trail</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Moon className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Dark/Light Theme</h3>
            <p className="text-gray-400">Switch between themes for comfortable viewing anytime</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Tag className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Tags & Labels</h3>
            <p className="text-gray-400">Add multiple tags to organize and categorize your tasks</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-white transition">
            <Lock className="w-12 h-12 text-white mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your data is protected with Firebase Authentication</p>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Join thousands of productive users today!</p>
          <Link 
            href="/auth/signup"
            className="bg-white hover:bg-gray-200 text-black font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-lg transition shadow-lg inline-block"
          >
            Start Managing Tasks Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
