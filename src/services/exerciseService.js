const RAPIDAPI_KEY = '52868d7e37msh2148f472139ecb4p14825ajsn7ace0222b913';
const RAPIDAPI_HOST = 'exercisedb.p.rapidapi.com';
const API_BASE = 'https://exercisedb.p.rapidapi.com/exercises';

export const exerciseService = {
  fetchExercises: async (searchTerm = '', bodyPart = '') => {
    try {
      let url = API_BASE;
      
      if (searchTerm) {
        url = `https://exercisedb.p.rapidapi.com/exercises/name/${encodeURIComponent(searchTerm)}`;
      } else if (bodyPart) {
        url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;
      }
      
      // Add limit parameter to avoid fetching too many exercises
      url += url.includes('?') ? '&limit=20' : '?limit=20';
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch exercises from API');
      }
      
      const data = await response.json();
      
      const exercises = data.map((exercise, index) => ({
        id: exercise.id || `${exercise.name.replace(/\s/g, '_')}_${index}`,
        name: exercise.name,
        description: exercise.instructions?.join(' ') || 'No description available',
        type: exercise.equipment || 'bodyweight',
        muscle: exercise.target || exercise.bodyPart || 'general',
        difficulty: 'intermediate',
        equipment: exercise.equipment || 'none',
        gifUrl: exercise.gifUrl || '',
      }));
      
      return {
        success: true,
        exercises: exercises,
        count: exercises.length,
      };
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return {
        success: false,
        exercises: [],
        error: 'Failed to fetch exercises. Please try again.',
      };
    }
  },

  calculateCalories: (exerciseName, duration, sets = 1, reps = 1) => {
    const name = exerciseName.toLowerCase();
    let met = 5;
    
    if (name.includes('run') || name.includes('jog')) met = 9;
    else if (name.includes('swim')) met = 8;
    else if (name.includes('cycling') || name.includes('bike')) met = 7;
    else if (name.includes('jump') || name.includes('burpee')) met = 10;
    else if (name.includes('walk')) met = 4;
    else if (name.includes('squat') || name.includes('deadlift')) met = 6;
    else if (name.includes('bench') || name.includes('press')) met = 5;
    else if (name.includes('pull') || name.includes('chin')) met = 5.5;
    else if (name.includes('row')) met = 5.5;
    else if (name.includes('curl')) met = 4;
    else if (name.includes('lunge')) met = 5;
    
    const avgWeight = 70;
    const hours = duration / 60;
    const baseCalories = met * avgWeight * hours;
    const intensityMultiplier = Math.min(sets * reps / 10, 2);
    
    return Math.round(baseCalories * intensityMultiplier);
  },
};
