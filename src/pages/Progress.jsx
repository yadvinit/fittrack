import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workoutService } from '../services/workoutService';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [exerciseFrequency, setExerciseFrequency] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    loadProgressData();
  }, [timeRange]);

  const loadProgressData = () => {
    setLoading(true);
    
    const progress = workoutService.getProgressData();
    const frequency = workoutService.getExerciseFrequency();
    const statsData = workoutService.getStats();
    
    const daysAgo = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    const filteredProgress = progress.filter(p => {
      const date = new Date(p.date);
      return date >= cutoffDate;
    });
    
    setProgressData(filteredProgress);
    setExerciseFrequency(frequency);
    setStats(statsData);
    setLoading(false);
  };

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading progress data...</p>
        </div>
      </div>
    );
  }

  const hasData = progressData.length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Progress Tracker
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Visualize your fitness journey 📈
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setTimeRange('7')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                timeRange === '7'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                timeRange === '30'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('90')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                timeRange === '90'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 90 Days
            </button>
          </div>
        </div>

        {/* Empty State */}
        {!hasData && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-7xl mb-6">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Data Yet</h2>
            <p className="text-gray-600 mb-6">
              Start logging workouts to see your progress charts!
            </p>
            <Link
              to="/add-workout"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition"
            >
              Log Your First Workout
            </Link>
          </div>
        )}

        {/* Stats Overview */}
        {hasData && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Total Workouts</p>
              <p className="text-4xl font-bold">{stats.totalWorkouts}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">This Week</p>
              <p className="text-4xl font-bold">{stats.weekWorkouts}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Calories Burned</p>
              <p className="text-4xl font-bold">{stats.totalCalories.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Current Streak</p>
              <p className="text-4xl font-bold">{stats.streak} days</p>
            </div>
          </div>
        )}

        {/* Charts */}
        {hasData && (
          <div className="space-y-8">
            
            {/* Workout Frequency Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Daily Workout Activity
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="workouts" fill="#6366f1" name="Workouts" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Calories Burned Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Calories Burned Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Calories"
                    dot={{ fill: '#f59e0b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Duration Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Workout Duration (minutes)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="duration"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Duration (min)"
                    dot={{ fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Exercise Distribution */}
            {exerciseFrequency.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Exercise Distribution
                  </h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={exerciseFrequency}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={(entry) => entry.name}
                      >
                        {exerciseFrequency.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Exercises List */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Most Frequent Exercises
                  </h2>
                  <div className="space-y-4">
                    {exerciseFrequency.slice(0, 5).map((exercise, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-semibold text-gray-900">
                            {exercise.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{exercise.count}x</p>
                          <p className="text-sm text-gray-500">
                            {exercise.totalCalories} cal
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Weekly Summary */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Weekly Summary</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm opacity-90 mb-2">Workouts This Week</p>
                  <p className="text-3xl font-bold">{stats.weekWorkouts}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2">Calories This Week</p>
                  <p className="text-3xl font-bold">{stats.weekCalories.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90 mb-2">Current Streak</p>
                  <p className="text-3xl font-bold">🔥 {stats.streak} days</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Progress;
