import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { workoutService } from '../services/workoutService';
import { exerciseService } from '../services/exerciseService';

const AddWorkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedExercise = location.state?.exercise;

  const [formData, setFormData] = useState({
    exerciseName: preselectedExercise?.name || '',
    sets: '',
    reps: '',
    duration: '',
    weight: '',
    notes: '',
  });
  
  const [calories, setCalories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (formData.exerciseName && formData.duration) {
      const sets = parseInt(formData.sets) || 1;
      const reps = parseInt(formData.reps) || 1;
      const duration = parseInt(formData.duration);
      
      const estimatedCalories = exerciseService.calculateCalories(
        formData.exerciseName,
        duration,
        sets,
        reps
      );
      
      setCalories(estimatedCalories);
    }
  }, [formData.exerciseName, formData.sets, formData.reps, formData.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.exerciseName.trim()) {
      setError('Please enter an exercise name');
      setLoading(false);
      return;
    }

    if (!formData.duration || parseInt(formData.duration) <= 0) {
      setError('Please enter a valid duration');
      setLoading(false);
      return;
    }

    const workout = {
      exerciseName: formData.exerciseName.trim(),
      sets: parseInt(formData.sets) || 1,
      reps: parseInt(formData.reps) || 1,
      duration: parseInt(formData.duration),
      weight: formData.weight ? parseFloat(formData.weight) : null,
      calories: calories,
      notes: formData.notes.trim(),
    };

    const result = workoutService.addWorkout(workout);

    if (result.success) {
      setSuccess(true);
      setFormData({
        exerciseName: '',
        sets: '',
        reps: '',
        duration: '',
        weight: '',
        notes: '',
      });
      setCalories(0);
      
      setTimeout(() => {
        navigate('/history');
      }, 1500);
    } else {
      setError(result.error || 'Failed to save workout');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        

        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Log Workout
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Track your fitness activity 💪
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 animate-pulse">
            <p className="font-semibold">✅ Workout logged successfully!</p>
            <p className="text-sm mt-1">Redirecting to workout history...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Exercise Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Exercise Name *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="exerciseName"
                  value={formData.exerciseName}
                  onChange={handleChange}
                  placeholder="e.g., Bench Press, Running, Squats"
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => navigate('/exercises')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-3 rounded-lg transition whitespace-nowrap"
                >
                  Browse 🔍
                </button>
              </div>
            </div>

            {/* Sets and Reps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sets
                </label>
                <input
                  type="number"
                  name="sets"
                  value={formData.sets}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reps
                </label>
                <input
                  type="number"
                  name="reps"
                  value={formData.reps}
                  onChange={handleChange}
                  placeholder="e.g., 12"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Duration and Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  min="1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight (kg) - Optional
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 60"
                  step="0.1"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Calories Display */}
            {calories > 0 && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-1">Estimated Calories Burned</p>
                <p className="text-3xl font-bold text-orange-600">🔥 {calories} cal</p>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional notes about this workout..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || success}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : success ? 'Saved!' : 'Save Workout'}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Fill in all required fields marked with *</li>
            <li>• Use the Browse button to find exercises from our database</li>
            <li>• Calories are automatically calculated based on your workout</li>
            <li>• Track weight to monitor your strength progression</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default AddWorkout;
