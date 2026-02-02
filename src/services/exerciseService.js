const API_NINJAS_KEY = 'ReM76ZkyBBerkfSQWZ0FlqwCtY43VnLR1daRNxkw';
const API_NINJAS_BASE = 'https://api.api-ninjas.com/v1/exercises';

const FALLBACK_EXERCISES = [
  { name: 'Push-ups', instructions: 'Classic bodyweight chest exercise', type: 'strength', muscle: 'chest', difficulty: 'beginner' },
  { name: 'Squats', instructions: 'Lower body compound movement', type: 'strength', muscle: 'quadriceps', difficulty: 'beginner' },
  { name: 'Lunges', instructions: 'Single leg strength exercise', type: 'strength', muscle: 'quadriceps', difficulty: 'beginner' },
  { name: 'Plank', instructions: 'Core stability hold', type: 'strength', muscle: 'abdominals', difficulty: 'beginner' },
  { name: 'Jumping Jacks', instructions: 'Full body cardio exercise', type: 'cardio', muscle: 'general', difficulty: 'beginner' },
  { name: 'Burpees', instructions: 'High intensity full body exercise', type: 'cardio', muscle: 'general', difficulty: 'intermediate' },
  { name: 'Mountain Climbers', instructions: 'Dynamic core and cardio exercise', type: 'cardio', muscle: 'abdominals', difficulty: 'intermediate' },
  { name: 'Bicycle Crunches', instructions: 'Rotational ab exercise', type: 'strength', muscle: 'abdominals', difficulty: 'beginner' },
  { name: 'Pull-ups', instructions: 'Upper body pulling exercise', type: 'strength', muscle: 'lats', difficulty: 'intermediate' },
  { name: 'Dips', instructions: 'Triceps and chest exercise', type: 'strength', muscle: 'triceps', difficulty: 'intermediate' },
];

export const exerciseService = {
  fetchExercises: async (page = 1, searchTerm = '') => {
    try {
      const offset = (page - 1) * 10;
      let url = API_NINJAS_BASE;
      
      if (searchTerm) {
        url += `?name=${encodeURIComponent(searchTerm)}`;
      } else {
        const muscleGroups = ['chest', 'biceps', 'quadriceps', 'abdominals', 'lats', 'triceps', 'shoulders'];
        const randomMuscle = muscleGroups[page % muscleGroups.length];
        url += `?muscle=${randomMuscle}&offset=${offset}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': API_NINJAS_KEY,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch exercises from API');
      }
      
      const data = await response.json();
      
      const exercises = data.map((exercise, index) => ({
        id: `${exercise.name.replace(/\s/g, '_')}_${page}_${index}`,
        name: exercise.name,
        description: exercise.instructions || 'No description available',
        type: exercise.type || 'strength',
        muscle: exercise.muscle || 'general',
        difficulty: exercise.difficulty || 'beginner',
        equipment: exercise.equipment || 'none',
      }));
      
      return {
        success: true,
        exercises: exercises.length > 0 ? exercises : exerciseService.getFallbackExercises(page, searchTerm),
        count: exercises.length,
        next: exercises.length >= 10,
        previous: page > 1,
      };
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return {
        success: true,
        exercises: exerciseService.getFallbackExercises(page, searchTerm),
        count: FALLBACK_EXERCISES.length,
        next: false,
        previous: page > 1,
        warning: 'Using offline exercise database',
      };
    }
  },

  getFallbackExercises: (page = 1, searchTerm = '') => {
    let filtered = [...FALLBACK_EXERCISES];
    
    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    const start = (page - 1) * 10;
    const end = start + 10;
    
    return filtered.slice(start, end).map((ex, index) => ({
      id: `${ex.name.replace(/\s/g, '_')}_${page}_${index}`,
      name: ex.name,
      description: ex.instructions,
      type: ex.type,
      muscle: ex.muscle,
      difficulty: ex.difficulty,
      equipment: 'bodyweight',
    }));
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
