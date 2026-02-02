const WORKOUTS_KEY = 'fittrack_workouts';

export const workoutService = {
  getAllWorkouts: () => {
    try {
      const data = localStorage.getItem(WORKOUTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading workouts:', error);
      return [];
    }
  },

  addWorkout: (workout) => {
    try {
      const workouts = workoutService.getAllWorkouts();
      const newWorkout = {
        ...workout,
        id: Date.now(),
        date: new Date().toISOString(),
      };
      workouts.push(newWorkout);
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
      return { success: true, workout: newWorkout };
    } catch (error) {
      console.error('Error adding workout:', error);
      return { success: false, error: 'Failed to save workout' };
    }
  },

  deleteWorkout: (id) => {
    try {
      const workouts = workoutService.getAllWorkouts();
      const filtered = workouts.filter((w) => w.id !== id);
      localStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      console.error('Error deleting workout:', error);
      return { success: false, error: 'Failed to delete workout' };
    }
  },

  getRecentWorkouts: (days = 7) => {
    const workouts = workoutService.getAllWorkouts();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return workouts
      .filter((w) => new Date(w.date) >= cutoffDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getStats: () => {
    const workouts = workoutService.getAllWorkouts();
    const now = new Date();
    
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekWorkouts = workouts.filter(w => new Date(w.date) >= weekAgo);
    
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthWorkouts = workouts.filter(w => new Date(w.date) >= monthAgo);
    
    const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    const weekCalories = weekWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    
    const streak = workoutService.calculateStreak(workouts);
    
    return {
      totalWorkouts: workouts.length,
      weekWorkouts: weekWorkouts.length,
      monthWorkouts: monthWorkouts.length,
      totalCalories,
      weekCalories,
      streak,
    };
  },

  calculateStreak: (workouts) => {
    if (workouts.length === 0) return 0;
    
    const sortedDates = workouts
      .map(w => new Date(w.date).toDateString())
      .filter((date, index, self) => self.indexOf(date) === index)
      .sort((a, b) => new Date(b) - new Date(a));
    
    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
      return 0;
    }
    
    let currentDate = new Date();
    for (let i = 0; i < sortedDates.length; i++) {
      const checkDate = new Date(currentDate);
      checkDate.setHours(0, 0, 0, 0);
      
      const workoutDate = new Date(sortedDates[i]);
      workoutDate.setHours(0, 0, 0, 0);
      
      if (checkDate.getTime() === workoutDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (checkDate.getTime() < workoutDate.getTime()) {
        continue;
      } else {
        break;
      }
    }
    
    return streak;
  },

  getProgressData: () => {
    const workouts = workoutService.getAllWorkouts();
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentWorkouts = workouts
      .filter(w => new Date(w.date) >= thirtyDaysAgo)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const dailyData = {};
    recentWorkouts.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!dailyData[date]) {
        dailyData[date] = { date, workouts: 0, calories: 0, duration: 0 };
      }
      dailyData[date].workouts += 1;
      dailyData[date].calories += workout.calories || 0;
      dailyData[date].duration += workout.duration || 0;
    });
    
    return Object.values(dailyData);
  },

  getExerciseFrequency: () => {
    const workouts = workoutService.getAllWorkouts();
    const frequency = {};
    
    workouts.forEach(workout => {
      const name = workout.exerciseName;
      if (!frequency[name]) {
        frequency[name] = { name, count: 0, totalCalories: 0 };
      }
      frequency[name].count += 1;
      frequency[name].totalCalories += workout.calories || 0;
    });
    
    return Object.values(frequency)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  },
};
