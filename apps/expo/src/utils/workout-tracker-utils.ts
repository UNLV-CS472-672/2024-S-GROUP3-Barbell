import { WorkoutTemplateInfoSchema } from '^/packages/validators/src'
import { z } from 'zod'

import { TExercise } from '~/components/tracker/workout-tracker'

export type TWorkoutTemplateInfo = z.infer<typeof WorkoutTemplateInfoSchema>

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
    return result.data.workoutName.trim()
  }

  return 'New Workout'
}

export const extractWorkoutTemplate = (data: unknown): TWorkoutTemplateInfo | null => {
  const result = WorkoutTemplateInfoSchema.safeParse(data)

  if (result.success) {
    return { ...result.data, workoutName: result.data.workoutName.trim() }
  }

  return null
}

export const areTemplatesDifferent = (
  workoutTemplate: TWorkoutTemplateInfo | null,
  workoutName: string,
  exercises: TExercise[],
): boolean => {
  if (!workoutTemplate) return false

  if (workoutName !== workoutTemplate.workoutName) {
    return true
  }

  const { exercises: templateExercises } = workoutTemplate

  if (exercises.length !== templateExercises.length) {
    return true
  }

  for (let i = 0; i < exercises.length; i++) {
    if (exercises[i]!.id !== templateExercises[i]!.id) {
      return true
    }
    if (exercises[i]!.sets.length !== templateExercises[i]!.sets.length) {
      return true
    }

    for (let j = 0; j < exercises[i]!.sets.length; j++) {
      const { weight, reps, type, unilateral } = exercises[i]!.sets[j]!
      const {
        weight: templateWeight,
        reps: templateReps,
        type: templateType,
        unilateral: templateUnilateral,
      } = templateExercises[i]!.sets[j]!

      if (type !== templateType) return true
      if (unilateral !== templateUnilateral) return true

      if (unilateral) {
        if (weight[0] !== templateWeight[0] || weight[1] !== templateWeight[1]) return true
        if (reps[0] !== templateReps[0] || reps[1] !== templateReps[1]) return true
      } else {
        if (weight[0] !== templateWeight[0]) return true
        if (reps[0] !== templateReps[0]) return true
      }
    }
  }

  return false
}
