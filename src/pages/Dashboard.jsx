import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workoutService } from '../services/workoutService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    const workoutStats = workoutService.getStats();
    
    const allWorkouts = workoutService.getRecentWorkouts(30);
    const recent = allWorkouts.slice(0, 5);

    setStats(workoutStats);
    setRecentWorkouts(recent);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Workouts', value: stats.totalWorkouts, icon: '💪', color: 'bg-blue-500' },
    { title: 'This Week', value: stats.weekWorkouts, icon: '📅', color: 'bg-green-500' },
    { title: 'This Month', value: stats.monthWorkouts, icon: '📊', color: 'bg-purple-500' },
    { title: 'Calories Burned', value: stats.totalCalories, icon: '🔥', color: 'bg-orange-500' },
    { title: 'Current Streak', value: `${stats.streak} days`, icon: '⚡', color: 'bg-yellow-500' },
    { title: 'Week Calories', value: stats.weekCalories, icon: '📈', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">


        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Welcome back! Here's your fitness overview 👋
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} text-white text-4xl p-4 rounded-xl shadow`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <Link
            to="/exercises"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 sm:p-8 text-center text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="text-6xl mb-4">💪</div>
            <h3 className="text-2xl font-bold mb-2">Browse Exercises</h3>
            <p className="text-indigo-100">Explore workout database</p>
          </Link>

          <Link
            to="/add-workout"
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 sm:p-8 text-center text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="text-6xl mb-4">➕</div>
            <h3 className="text-2xl font-bold mb-2">Log Workout</h3>
            <p className="text-green-100">Add your latest session</p>
          </Link>

          <Link
            to="/progress"
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 sm:p-8 text-center text-white hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl font-bold mb-2">View Progress</h3>
            <p className="text-purple-100">Track your improvements</p>
          </Link>
        </div>

        {/* Recent Workouts */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Recent Workouts
            </h2>
            <Link
              to="/history"
              className="text-indigo-600 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          {recentWorkouts.length === 0 ? (
            <div className="text-center py-14">
              <div className="text-7xl mb-6">📝</div>
              <p className="text-lg text-gray-600 mb-6">
                No workouts logged yet
              </p>
              <Link
                to="/add-workout"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition"
              >
                Add Your First Workout
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="border border-gray-200 rounded-xl p-5 hover:border-indigo-500 hover:shadow-sm transition bg-gradient-to-r from-white to-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {workout.exerciseName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(workout.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-700">
                        {workout.sets} × {workout.reps}
                      </p>
                      <p className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg inline-block mt-1">
                        🔥 {workout.calories} cal
                      </p>
                    </div>
                  </div>

                  {workout.duration && (
                    <p className="text-sm text-gray-600 mt-3 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                      ⏱️ {workout.duration} minutes
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
