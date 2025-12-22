'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTaskContext } from '@/context/TaskContext';
import Navbar from '@/components/Navbar';
import { BarChart3, ListTodo, CheckCircle2, Zap, Clock, Lightbulb } from 'lucide-react';

export default function Analytics() {
  const { user, loading: authLoading } = useAuth();
  const { getAnalytics, tasks } = useTaskContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return null;
  }

  const analytics = getAnalytics();

  const completionRate = analytics.total > 0 
    ? ((analytics.completed / analytics.total) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10" />
          Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gray-700 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <ListTodo className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-semibold">Total Tasks</h3>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{analytics.total}</p>
          </div>

          <div className="bg-black dark:bg-white text-white dark:text-black rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-semibold">Completed</h3>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{analytics.completed}</p>
            <p className="text-xs sm:text-sm opacity-90 mt-1">{completionRate}% completion rate</p>
          </div>

          <div className="bg-gray-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-semibold">In Progress</h3>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{analytics.inProgress}</p>
          </div>

          <div className="bg-gray-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <h3 className="text-base sm:text-lg font-semibold">Pending</h3>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">{analytics.pending}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Tasks by Priority</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">High Priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.byPriority.high}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Medium Priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.byPriority.medium}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Low Priority</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{analytics.byPriority.low}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Tasks by Category</h2>
            <div className="space-y-3">
              {Object.entries(analytics.byCategory).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{count}</span>
                </div>
              ))}
              {Object.keys(analytics.byCategory).length === 0 && (
                <p className="text-gray-500 text-center">No categories yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Overall Progress</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-black dark:text-black dark:bg-white">
                  Completed: {analytics.completed} / {analytics.total}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-900 dark:text-white">
                  {completionRate}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
              <div 
                style={{ width: `${completionRate}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black dark:bg-white transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-gray-800 dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" />
            Productivity Insights
          </h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>• You have {analytics.todo} tasks waiting to be started</li>
            <li>• {analytics.byPriority.high} high-priority tasks need your attention</li>
            <li>• Keep up the momentum! {completionRate}% completion rate</li>
            {analytics.total === 0 && <li>• Start by creating your first task!</li>}
          </ul>
        </div>
      </main>
    </div>
  );
}
