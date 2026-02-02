import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exerciseService } from '../services/exerciseService';

const BrowseExercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadExercises();
  }, [page, searchTerm]);

  const loadExercises = async () => {
    setLoading(true);
    setError('');
    
    const result = await exerciseService.fetchExercises(page, searchTerm);
    
    if (result.success) {
      setExercises(result.exercises);
      setHasMore(result.next !== null);
    } else {
      setError(result.error || 'Failed to load exercises');
    }
    
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handleUseExercise = (exercise) => {
    navigate('/add-workout', { state: { exercise } });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3">
            Browse Exercises
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Explore exercises from API-Ninjas database 💪
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search exercises (e.g., bench press, squat...)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setPage(1);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            💡 <strong>Using API-Ninjas Exercise Database</strong> - Get your free API key at{' '}
            <a href="https://api-ninjas.com/api/exercises" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
              api-ninjas.com
            </a>
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading exercises...</p>
            </div>
          </div>
        )}

        {!loading && exercises.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <div className="text-7xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">No exercises found</p>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        )}

        {!loading && exercises.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {exercise.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {exercise.difficulty && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    )}
                    {exercise.muscle && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold capitalize">
                        {exercise.muscle.replace('_', ' ')}
                      </span>
                    )}
                    {exercise.type && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold capitalize">
                        {exercise.type}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {exercise.description || 'No description available'}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedExercise(exercise)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg transition text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleUseExercise(exercise)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
                    >
                      Use Exercise
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>
              <div className="bg-white px-6 py-3 rounded-lg shadow-md font-semibold text-gray-900">
                Page {page}
              </div>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={!hasMore}
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedExercise.name}
                </h2>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {selectedExercise.difficulty && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Difficulty</p>
                      <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${
                        selectedExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        selectedExercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedExercise.difficulty}
                      </span>
                    </div>
                  )}
                  {selectedExercise.muscle && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Target Muscle</p>
                      <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-semibold capitalize">
                        {selectedExercise.muscle.replace('_', ' ')}
                      </span>
                    </div>
                  )}
                  {selectedExercise.type && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Exercise Type</p>
                      <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-semibold capitalize">
                        {selectedExercise.type}
                      </span>
                    </div>
                  )}
                  {selectedExercise.equipment && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Equipment</p>
                      <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-semibold capitalize">
                        {selectedExercise.equipment}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedExercise.description || 'No instructions available'}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={() => {
                      handleUseExercise(selectedExercise);
                      setSelectedExercise(null);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition"
                  >
                    Use This Exercise
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BrowseExercises;
