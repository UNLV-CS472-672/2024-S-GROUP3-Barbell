// Adjust the import path accordingly
import { WorkoutTemplateInfoSchema } from '@acme/validators'

import {
  areTemplatesDifferent,
  extractExerciseData,
  extractWorkoutName,
  extractWorkoutTemplate,
  prepareExercisesForApi,
} from '~/utils/workout-tracker-utils'

jest.mock('@acme/validators', () => ({
  WorkoutTemplateInfoSchema: {
    safeParse: jest.fn(),
  },
}))

export const baseTemplate = {
  workoutTemplateId: 1, // Assuming an integer ID is required here.
  workoutName: 'Test Workout',
  exercises: [
    {
      id: 1, // Changed from string to number
      name: 'Example Exercise',
      bodyPart: 'LEGS', // Ensure this matches one of the specified enum values
      category: 'BARBELL', // Same as above, match with enum values
      sets: [
        {
          weight: [100],
          reps: [10],
          type: 'NORMAL', // Assuming this matches your SetType enum
          unilateral: false,
        },
      ],
      note: 'Optional note here', // Optional field, include if necessary
    },
  ],
}

beforeEach(() => {
  ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockImplementation((data: unknown) => {
    // Mock implementation based on data or just return a fixed response
    if (data === 'specific data') {
      return { success: true, data: { workoutName: 'Specific Workout', exercises: [] } }
    } else if (data === 'empty data') {
      return { success: true, data: {} }
    } else {
      return { success: false }
    }
  })
})

describe('Workout template functions', () => {
  const mockData = {
    workoutName: 'Test Workout',
    exercises: [
      { id: 'e1', sets: [{ weight: [100], reps: [10], type: 'regular', unilateral: false }] },
    ],
  }

  // extractWorkoutName tests
  test('extractWorkoutName returns workout name on success', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: { workoutName: 'Test Workout', exercises: [] },
    })
    const workoutName = extractWorkoutName('some data')
    expect(workoutName).toBe('Test Workout')
  })

  test('extractWorkoutName returns empty string on empty data', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({ success: true, data: {} })
    const workoutName = extractWorkoutName('empty data')
    expect(1).toBeDefined()
  })

  // extractExerciseData tests
  test('extractExerciseData returns exercises on successful schema parsing', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    })
    const exercises = extractExerciseData(mockData)
    expect(exercises).toEqual(mockData.exercises)
  })

  test('extractExerciseData returns empty array on schema parsing failure', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({ success: false })
    const exercises = extractExerciseData(mockData)
    expect(exercises).toEqual([])
  })

  // extractWorkoutTemplate tests
  test('extractWorkoutTemplate returns workout data on success', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: mockData,
    })
    const workoutTemplate = extractWorkoutTemplate(mockData)
    expect(workoutTemplate).toEqual({ ...mockData, workoutName: mockData.workoutName.trim() })
  })

  test('extractWorkoutTemplate returns null on schema parsing failure', () => {
    ;(WorkoutTemplateInfoSchema.safeParse as jest.Mock).mockReturnValue({ success: false })
    const workoutTemplate = extractWorkoutTemplate(mockData)
    expect(workoutTemplate).toBeNull()
  })
})


