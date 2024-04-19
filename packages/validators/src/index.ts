import { BodyPart, Category, SetType } from '@prisma/client'
import { z } from 'zod'

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
})

export const UpdateUserSchema = z.object({
  id: z.number().int(),
  notificationsBanners: z.boolean().optional(),
})

export const SetSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(SetType),
  reps: z.array(z.number().int()),
  weight: z.array(z.number()),
  exerciseId: z.number().int(),
  unilateral: z.boolean().default(false),
})

export const ExerciseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  note: z.string().optional().nullable(),
  bodyPart: z.nativeEnum(BodyPart),
  category: z.nativeEnum(Category),
  sets: z.array(SetSchema),
})

export const WorkoutSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().optional(),
  duration: z.number().int(),
  finishedAt: z.date(),
  exercises: z.array(ExerciseSchema),
  userId: z.number().int(),
})

export const WorkoutTemplateInfoSchema = z.object({
  workoutTemplateId: z.number().int(),
  workoutName: z.string(),
  exercises: z.array(ExerciseSchema),
})