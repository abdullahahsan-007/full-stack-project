'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

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
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            TaskManager Pro
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Your Ultimate Productivity Companion
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Organize, track, and complete your tasks with powerful features including Kanban boards, 
            analytics, categories, recurring tasks, and more!
          </p>
          
          <div className="flex gap-6 justify-center">
            <Link 
              href="/auth/signup"
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg px-8 py-4 rounded-lg transition shadow-lg hover:shadow-cyan-500/50"
            >
              Get Started Free
            </Link>
            <Link 
              href="/auth/login"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg px-8 py-4 rounded-lg transition border border-gray-700"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-white mb-2">Kanban Board</h3>
            <p className="text-gray-400">Visualize your workflow with customizable columns: To Do, In Progress, Pending, and Done</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Priority & Categories</h3>
            <p className="text-gray-400">Organize tasks by priority levels and custom categories for better focus</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Advanced Search</h3>
            <p className="text-gray-400">Find tasks instantly with powerful search and filtering capabilities</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400">Track your productivity with detailed insights and completion rates</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold text-white mb-2">Recurring Tasks</h3>
            <p className="text-gray-400">Set up daily, weekly, or monthly recurring tasks automatically</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-xl font-bold text-white mb-2">Task History</h3>
            <p className="text-gray-400">Track all changes and updates with complete audit trail</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🌓</div>
            <h3 className="text-xl font-bold text-white mb-2">Dark/Light Theme</h3>
            <p className="text-gray-400">Switch between themes for comfortable viewing anytime</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🏷️</div>
            <h3 className="text-xl font-bold text-white mb-2">Tags & Labels</h3>
            <p className="text-gray-400">Add multiple tags to organize and categorize your tasks</p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-cyan-400 transition">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-gray-400">Your data is protected with Firebase Authentication</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Join thousands of productive users today!</p>
          <Link 
            href="/auth/signup"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold text-lg px-10 py-4 rounded-lg transition shadow-lg inline-block"
          >
            Start Managing Tasks Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
