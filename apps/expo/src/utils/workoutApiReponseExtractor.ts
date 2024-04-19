import { WorkoutTemplateInfoSchema } from "^/packages/validators/src"
import { TExercise } from "~/components/tracker/workout-tracker"

export const extractExerciseData = (data: unknown): TExercise[] => {
    const result = WorkoutTemplateInfoSchema.safeParse(data)
  
    if (result.success) {
      return result.data.exercises
    }
  
    return []
  }
  
  export const extractWorkoutName = (data: unknown): string => {
    const result = WorkoutTemplateInfoSchema.safeParse(data)
  
    if (result.success) {
      return result.data.workoutName
    }
  
    return 'New Workout'
  }