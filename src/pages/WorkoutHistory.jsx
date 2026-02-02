import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { workoutService } from '../services/workoutService';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  useEffect(() => {
    filterAndSortWorkouts();
  }, [workouts, searchTerm, sortBy]);

  const loadWorkouts = () => {
    setLoading(true);
    const data = workoutService.getAllWorkouts();
    setWorkouts(data);
    setLoading(false);
  };

  const filterAndSortWorkouts = () => {
    let filtered = [...workouts];

    if (searchTerm) {
      filtered = filtered.filter(w =>
        w.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'calories-desc':
          return (b.calories || 0) - (a.calories || 0);
        case 'calories-asc':
          return (a.calories || 0) - (b.calories || 0);
        case 'name-asc':
          return a.exerciseName.localeCompare(b.exerciseName);
        case 'name-desc':
          return b.exerciseName.localeCompare(a.exerciseName);
        default:
          return 0;
      }
    });

    setFilteredWorkouts(filtered);
  };

  const handleDelete = (id) => {
    const result = workoutService.deleteWorkout(id);
    if (result.success) {
      loadWorkouts();
      setShowDeleteModal(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading workouts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Workout History
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            View all your logged workouts 📋
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by exercise name..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="calories-desc">Highest Calories</option>
              <option value="calories-asc">Lowest Calories</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-600 mb-1">Total Workouts</p>
            <p className="text-3xl font-bold text-gray-900">{workouts.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <p className="text-sm text-gray-600 mb-1">Total Calories Burned</p>
            <p className="text-3xl font-bold text-gray-900">
              {workouts.reduce((sum, w) => sum + (w.calories || 0), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-600 mb-1">Total Duration</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatDuration(workouts.reduce((sum, w) => sum + (w.duration || 0), 0))}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {filteredWorkouts.length === 0 && workouts.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-7xl mb-6">🏋️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Workouts Yet</h2>
            <p className="text-gray-600 mb-6">Start tracking your fitness journey today!</p>
            <Link
              to="/add-workout"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition"
            >
              Log Your First Workout
            </Link>
          </div>
        )}

        {/* No Results */}
        {filteredWorkouts.length === 0 && workouts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="text-7xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Results Found</h2>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSortBy('date-desc');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Workouts List */}
        {filteredWorkouts.length > 0 && (
          <div className="space-y-4">
            {filteredWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {workout.exerciseName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(workout.date)}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Sets × Reps</p>
                        <p className="text-lg font-bold text-gray-900">
                          {workout.sets} × {workout.reps}
                        </p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Calories</p>
                        <p className="text-lg font-bold text-orange-600">
                          🔥 {workout.calories || 0}
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1">Duration</p>
                        <p className="text-lg font-bold text-blue-600">
                          ⏱️ {workout.duration} min
                        </p>
                      </div>

                      {workout.weight && (
                        <div className="bg-purple-50 rounded-lg p-3">
                          <p className="text-xs text-gray-600 mb-1">Weight</p>
                          <p className="text-lg font-bold text-purple-600">
                            💪 {workout.weight} kg
                          </p>
                        </div>
                      )}
                    </div>

                    {workout.notes && (
                      <div className="mt-4 bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{workout.notes}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setShowDeleteModal(workout)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition whitespace-nowrap h-fit"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Workout?</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{showDeleteModal.exerciseName}"? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteModal.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WorkoutHistory;
